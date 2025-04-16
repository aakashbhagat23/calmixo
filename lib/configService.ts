// lib/configService.ts
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { getCachedData, setCachedData } from '@/utils/cache';

export const fetchAppConfig = async () => {
  try {
    const key = 'app_config';
    const cachedConfig = await getCachedData(key, 60 * 60 * 1000); // Default to 1 hour if not set in config
    if (cachedConfig && cachedConfig.dailyThoughtText) {
       return cachedConfig;
    }
    const docRef = doc(db, key, 'OWYN31NBqTBkUe1XUW3C');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const configData = docSnap.data();
      setCachedData(key, configData);
      return configData;
    } else {
      console.warn('No config document found');
      return null;
    }
  } catch (err) {
    console.error('Error fetching config:', err);
    return null;
  }
};
