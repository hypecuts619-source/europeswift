import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

async function run() {
  const c = collection(db, 'swiftCodes');
  const q = query(c, where('country', '==', 'IT'));
  const snap = await getDocs(q);
  console.log(`There are ${snap.docs.length} swift codes for Italy in the db!`);
  
  snap.docs.slice(0, 5).forEach(d => console.log(d.id, d.data().bank));
  process.exit(0);
}
run();
