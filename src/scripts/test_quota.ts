import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

async function runTest() {
    try {
        console.log("Trying to write one test document...");
        await setDoc(doc(db, 'swiftCodes', 'TEST_QUOTA'), { test: true });
        console.log("Success!");
        process.exit(0);
    } catch(e) {
        console.log("Failed!", e);
        process.exit(1);
    }
}
runTest();
