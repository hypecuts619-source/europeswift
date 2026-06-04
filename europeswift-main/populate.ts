import { initializeApp } from 'firebase/app';
import { getFirestore, doc, writeBatch } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const firebaseConfig = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'firebase-applet-config.json'), 'utf-8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function run() {
    const countriesDir = path.resolve(process.cwd(), 'node_modules/swiftcodes-toolkit/AllCountries');
    const files = fs.readdirSync(countriesDir);
    const uniqueBics = new Map();
    let count = 0;

    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      const dataPath = path.join(countriesDir, file);
      const fileContent = fs.readFileSync(dataPath, 'utf-8');
      const countryData = JSON.parse(fileContent);
      const iso2 = countryData.country_code || file.replace('.json', '');
      
      if (countryData.list && Array.isArray(countryData.list)) {
        for (const item of countryData.list) {
            const bicStr = item.swift_code || item.bic;
            if (!bicStr) continue;
            
            const normalizedBic = bicStr.trim().toUpperCase();
            if (!uniqueBics.has(normalizedBic)) {
                uniqueBics.set(normalizedBic, {
                    bic: normalizedBic,
                    bank: item.bank || item.bank_name || "",
                    branch: item.branch || "",
                    city: item.city || "",
                    country: (item.country || iso2 || "").toUpperCase(),
                    address: item.address || ""
                });
            }
        }
      }
    }

    const allData = Array.from(uniqueBics.values());
    console.log(`Total unique BICs to upload: ${allData.length}`);

    // Batch upload in chunks of 500
    const BATCH_SIZE = 500;
    
    // Process in batches
    for (let i = 0; i < allData.length; i += BATCH_SIZE) {
        let chunk = allData.slice(i, i + BATCH_SIZE);
        const batch = writeBatch(db);
        chunk.forEach(docData => {
            const docRef = doc(db, 'swiftCodes', docData.bic);
            batch.set(docRef, docData, { merge: true });
        });
        
        try {
            await batch.commit();
            count += chunk.length;
            console.log(`Uploaded batch ${i / BATCH_SIZE + 1}. Total uploaded: ${count}`);
        } catch (e) {
            console.error(`Error uploading batch ${i / BATCH_SIZE + 1}: ${e.message}`);
        }
    }
    
    console.log(`Successfully finished uploading ${count} BICs.`);
    process.exit(0);
}

run().catch(e => {
    console.error(e);
    process.exit(1);
});
