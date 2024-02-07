import CookieAndStorageService from "../services/cookie-and-storage-service";

export const getAuthToken = async () => {
  try {
    const authToken = await CookieAndStorageService.get({ key: "auth" });
    return authToken;
  } catch (error) {
    throw error;
  }
};
