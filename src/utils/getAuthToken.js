import Storage from "../services/storage-service";

export const getAuthToken = async () => {
  try {
    const authToken = await Storage.get("auth");
    return authToken;
  } catch (error) {
    throw error;
  }
};
