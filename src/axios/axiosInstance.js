import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use((request) => {
  request.headers["Content-Type"] = "application/json";
  request.headers["api-version"] = "v1"
  return request;
});

export default axiosInstance;
