import AsyncStorage from '@react-native-async-storage/async-storage';

type DBKey = 'incorrectQuiz';

export const deviceDB = Object.freeze({
  set: async (key: DBKey, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`error on userDb set , ${error}`);
    }
  },
  get: async (key: DBKey): Promise<string | null> => {
    try {
      const item = await AsyncStorage.getItem(key);
      return item;
    } catch (error) {
      console.error(`error on userDb get , ${error}`);
      return null;
    }
  },
  remove: async (keyList: DBKey | DBKey[]): Promise<void> => {
    try {
      if (Array.isArray(keyList)) {
        await AsyncStorage.multiRemove(keyList);
      } else {
        await AsyncStorage.removeItem(keyList);
      }
    } catch (error) {
      console.error(`error on userDb remove , ${error}`);
    }
  },
});
