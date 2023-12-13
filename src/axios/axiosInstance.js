import axios from "axios";
import Storage from "../services/storage-service";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(async (request) => {
  request.headers["Content-Type"] = "application/json";
  request.headers["api-version"] = "v1";

  const token = (await Storage.get("auth")) || null;

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

export default axiosInstance;
