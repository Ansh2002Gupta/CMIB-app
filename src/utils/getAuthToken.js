import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthToken = async () => {
  try {
    const authToken = await AsyncStorage.getItem('authToken');
    if (authToken !== null) {
      return authToken;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};