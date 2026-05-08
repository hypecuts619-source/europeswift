import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../lib/firebase';

async function run() {
  const c = collection(db, 'swiftCodes');
  const snap = await getCountFromServer(c);
  console.log(`There are ${snap.data().count} swift codes in the db!`);
  process.exit(0);
}
run();
