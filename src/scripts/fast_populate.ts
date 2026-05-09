import fs from 'fs';
import path from 'path';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { db } from '../lib/firebase';

async function run() {
  console.log('Loading all countries from swiftcodes-toolkit...');
  try {
    const countriesDir = path.resolve(process.cwd(), 'node_modules/swiftcodes-toolkit/AllCountries');
    const files = fs.readdirSync(countriesDir);
    
    const uniqueBics = new Map();

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
            const normalized = bicStr.trim().toUpperCase();
            
            if (!uniqueBics.has(normalized)) {
                uniqueBics.set(normalized, {
                    bic: normalized,
                    bank: (item.bank || '').trim(),
                    branch: (item.branch || '').trim(),
                    city: (item.city || '').trim(),
                    address: (item.address || '').trim(),
                    country: iso2.trim().toUpperCase()
                });
            }
        }
      }
    }
    
    const finalData = Array.from(uniqueBics.values()).filter(b => b.bic && b.bank && b.country);
    
    // Sort to ensure deterministic order!
    finalData.sort((a, b) => a.bic.localeCompare(b.bic));
    
    const stateFile = path.resolve(process.cwd(), 'src/scripts/upload_state.txt');
    let startIdx = 0;
    if (fs.existsSync(stateFile)) {
        startIdx = parseInt(fs.readFileSync(stateFile, 'utf-8'), 10);
    }

    console.log(`Extracted ${finalData.length} unique branches. Starting from index ${startIdx}...`);

    const swiftCollection = collection(db, 'swiftCodes');
    const BATCH_SIZE = 500;
    const P_LIMIT = 2; // 2 parallel batches
    
    const chunkify = (arr: any[], size: number) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
    const chunks = chunkify(finalData.slice(startIdx), BATCH_SIZE);
    
    let uploadedCount = startIdx;
    
    for (let i = 0; i < chunks.length; i += P_LIMIT) {
        console.log(`Starting batch ${i}...`);
        const batchPromises = chunks.slice(i, i + P_LIMIT).map(async chunk => {
            const currentBatch = writeBatch(db);
            for (const item of chunk) {
                const docRef = doc(swiftCollection, item.bic);
                currentBatch.set(docRef, item);
            }
            await currentBatch.commit();
            return chunk.length;
        });
        
        const results = await Promise.all(batchPromises);
        uploadedCount += results.reduce((a, b) => a + b, 0);
        console.log(`Uploaded ${uploadedCount} / ${finalData.length}...`);
        fs.writeFileSync(stateFile, uploadedCount.toString());
        
        if (uploadedCount - startIdx >= 20000) {
            console.log("Safe exit to avoid timeout. Please run again.");
            process.exit(0);
        }
    }

    console.log("Upload complete!");
    fs.unlinkSync(stateFile);
    process.exit(0);
    
  } catch(e) {
    console.log("Error:", e);
    process.exit(1);
  }
}

run();
