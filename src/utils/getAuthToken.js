import Storage from '../services/storage-service';

export const getAuthToken = async () => {
  try {
    const authToken = await Storage.get('authToken');
    return authToken;
  } catch (error) {
    throw error;
  }
};