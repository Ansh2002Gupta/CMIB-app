import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthToken = async () => {
  try {
    const authToken = await AsyncStorage.getItem('authToken');
    return authToken;
  } catch (error) {
    throw error;
  }
};