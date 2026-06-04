import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getCountFromServer } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const firebaseConfig = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'firebase-applet-config.json'), 'utf-8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function run() {
    const coll = collection(db, 'swiftCodes');
    const snapshot = await getCountFromServer(coll);
    console.log(`Total BICs in Firestore: ${snapshot.data().count}`);
    process.exit(0);
}

run().catch(console.error);
