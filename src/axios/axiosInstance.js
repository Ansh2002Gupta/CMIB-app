import axios from "axios";

import Storage from "../services/storage-service";
import { API_VERSION_NUMBER } from "../constants/constants";

axios.defaults.headers.common["Content-Type"] = "application/json";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(async (request) => {
  request.headers["api-version"] = API_VERSION_NUMBER;
  const token = (await Storage.get("auth")) || null;
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

export default axiosInstance;
