// lib/configService.ts
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export const fetchMusicList= async () => {
  try {
    const docRef = doc(db, 'music', '9K6uUGZVsCYRhPOZQ4au');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
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
