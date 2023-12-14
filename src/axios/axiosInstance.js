import axios from "axios";
import { API_VERSION_NUMBER } from "../constants/constants";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use((request) => {
  request.headers["Content-Type"] = "application/json";
  request.headers["api-version"] = API_VERSION_NUMBER;
  return request;
});

export default axiosInstance;
