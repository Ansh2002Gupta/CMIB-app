import axios from "axios";

import CookieAndStorageService from "../services/cookie-and-storage-service";
import Config from "../components/ReactConfig/ReactConfig";
import { useHeader } from "../hooks/useHeader";
import { API_VERSION_NUMBER, STATUS_CODES } from "../constants/constants";

const useAxiosInstance = () => {
  const { onLogout } = useHeader();

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

  axiosInstance.interceptors.response.use(
    (response) => {
      if (response.status === STATUS_CODES.UNAUTHORIZED_USER) {
        onLogout({
          message: "Your session has been expired",
          isLogoutToast: true,
          isError: false,
        });
      }
      return response;
    },
    (error) => {
      if (error.response?.status === STATUS_CODES.UNAUTHORIZED_USER) {
        onLogout({
          message: "Your session has been expired",
          isLogoutToast: true,
          isError: false,
        });
      }
      return Promise.reject(error);
    }
  );

  return { axiosInstance };
};

export default useAxiosInstance;
