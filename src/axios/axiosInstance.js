import axios from "axios";

import CookieAndStorageService from "../services/cookie-and-storage-service";
import Config from "../components/ReactConfig/ReactConfig";
import { API_VERSION_NUMBER } from "../constants/constants";

axios.defaults.headers.common["Content-Type"] = "application/json";
const axiosInstance = axios.create({
  baseURL: Config.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(async (request) => {
  request.headers["api-version"] = API_VERSION_NUMBER;
  const token = (await CookieAndStorageService.get({ key: "auth" })) || null;
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

export default axiosInstance;
