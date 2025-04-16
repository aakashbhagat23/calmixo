import AsyncStorage from '@react-native-async-storage/async-storage';

interface CachedItem {
  timestamp: number;
  data: any;
}

export const setCachedData = async (key: string, data: any) => {
  const cacheObject: CachedItem = {
    timestamp: Date.now(),
    data,
  };

  try {
    await AsyncStorage.setItem(key, JSON.stringify(cacheObject));
  } catch (error) {
    console.error('Error setting cache:', error);
  }
};

export const getCachedData = async (key: string, expiresIn: number = 0): Promise<any | null> => {
  try {
    const cachedString = await AsyncStorage.getItem(key);
    if (!cachedString) return null;

    const cache: CachedItem = JSON.parse(cachedString);
    if (expiresIn && Date.now() - cache.timestamp > expiresIn) {
      console.log(`${key} cache expired`);
      await AsyncStorage.removeItem(key); // Optional: clear expired cache
      return null;
    }

    return cache.data;
  } catch (error) {
    console.error('Error getting cache:', error);
    return null;
  }
};

export const clearCachedData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};
