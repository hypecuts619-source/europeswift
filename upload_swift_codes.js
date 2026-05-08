// A script to upload JSON SWIFT code lists to your Firebase Database
// Usage: node upload_swift_codes.js path/to/your/swift_codes.json
//
// Requires: npm install --no-save firebase-admin

const fs = require('fs');
const admin = require('firebase-admin');
const config = require('./firebase-applet-config.json');

// NOTE: You will need a service account key to run this locally,
// OR you can use the interactive Firebase UI to upload a JSON file!

console.log("To upload data easily from you browser:");
console.log("1. Format your SWIFT codes as a JSON array of objects:");
console.log(`[
  { "bic": "DEUTDEXX", "bank": "Deutsche Bank", "branch": "Main", "city": "Frankfurt", "country": "DE" },
  { "bic": "BARCGB22", "bank": "Barclays", "branch": "London", "city": "London", "country": "GB" }
]`);
console.log("2. Open your Firebase Database Console (linked above in the chat)");
console.log("3. Create a collection named 'swiftCodes'");
console.log("4. Import the JSON or use a tool like 'firestore-export-import' to upload your dataset.");
