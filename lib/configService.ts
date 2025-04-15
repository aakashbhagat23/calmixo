// lib/configService.ts
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export const fetchAppConfig = async () => {
  try {
    const docRef = doc(db, 'app_config', 'OWYN31NBqTBkUe1XUW3C');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.warn('No config document found');
      return null;
    }
  } catch (err) {
    console.error('Error fetching config:', err);
    return null;
  }
};
