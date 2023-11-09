import AsyncStorage from '@react-native-async-storage/async-storage';

function formatKey(name) {
  return `react_app_${name}`;
}

class Storage {
  static async set(key, value) {
    if (!value) return;
    try {
      await AsyncStorage.setItem(formatKey(key), JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }

  static async get(key) {
    if (!key) return;
    try {
      const item = await AsyncStorage.getItem(formatKey(key));
      if (!item) return;
      return JSON.parse(item);
    } catch (error) {
      console.error(error);
    }
  }

  static async remove(key) {
    if (!key) return;
    try {
      await AsyncStorage.removeItem(formatKey(key));
    } catch (error) {
      console.error(error);
    }
  }

  static async removeAll() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const formattedKeys = keys.filter(key => key.startsWith('react_app_'));
      await AsyncStorage.multiRemove(formattedKeys);
    } catch (error) {
      console.error(error);
    }
  }
}

export default Storage;
