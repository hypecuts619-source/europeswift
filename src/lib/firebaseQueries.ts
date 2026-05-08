import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';

export interface SwiftCodeDoc {
  bic: string;
  bank: string;
  branch?: string;
  city?: string;
  country: string;
  address?: string;
}

export async function getSwiftCodesByCountry(countryCode: string): Promise<SwiftCodeDoc[]> {
  try {
    const q = query(
      collection(db, 'swiftCodes'),
      where('country', '==', countryCode.toUpperCase()),
      limit(1000)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as SwiftCodeDoc);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'swiftCodes');
    return [];
  }
}

export async function getSwiftCodesByBank(countryCode: string, bankName: string): Promise<SwiftCodeDoc[]> {
  try {
    const q = query(
      collection(db, 'swiftCodes'),
      where('country', '==', countryCode.toUpperCase()),
      where('bank', '==', bankName),
      limit(1000)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as SwiftCodeDoc);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'swiftCodes');
    return [];
  }
}
