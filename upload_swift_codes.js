// A script to upload JSON SWIFT code lists to your Firebase Database
// Usage: node upload_swift_codes.js path/to/your/swift_codes.json
//
// Requires: 
// 1. npm install firebase-admin
// 2. A service_account.json key from your Firebase Console (Project Settings > Service Accounts)

const fs = require('fs');
const admin = require('firebase-admin');

// IMPORTANT: Download your service account JSON file and place it in this directory as service_account.json
const serviceAccount = require('./service_account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function uploadSwiftCodes() {
  const filePath = process.argv[2] || 'swift_codes.json';
  
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`Loaded ${data.length} records. Starting upload...`);

  // Firestore allows a max of 500 writes per batch
  const BATCH_SIZE = 500;
  let batch = db.batch();
  let count = 0;

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    // Create a standardized object (you might need to map fields depending on the CSV/JSON you download)
    const docData = {
      bic: item.bic || item.swift_code || "",
      bank: item.bank || item.bank_name || "",
      branch: item.branch || "",
      city: item.city || "",
      country: (item.country || item.country_code || "").toUpperCase(),
      address: item.address || ""
    };

    if (!docData.bic || !docData.country || !docData.bank) {
        console.warn(`Skipping invalid record at index ${i}: missing bic, bank, or country`);
        continue;
    }

    const docRef = db.collection('swiftCodes').doc(docData.bic);
    batch.set(docRef, docData);
    count++;

    if (count % BATCH_SIZE === 0 || i === data.length - 1) {
      console.log(`Committing batch of ${count % BATCH_SIZE === 0 ? BATCH_SIZE : count % BATCH_SIZE} records... (${i + 1}/${data.length})`);
      await batch.commit();
      batch = db.batch(); // Create a new batch
    }
  }

  console.log(`Successfully uploaded ${count} SWIFT codes to Firebase!`);
}

uploadSwiftCodes().catch(console.error);
