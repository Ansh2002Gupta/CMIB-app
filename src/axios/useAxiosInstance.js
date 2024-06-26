import axios from "axios";
import { useIntl } from "react-intl";

import CookieAndStorageService from "../services/cookie-and-storage-service";
import Config from "../components/ReactConfig/ReactConfig";
import { useHeader } from "../hooks/useHeader";
import {
  API_VERSION_NUMBER,
  API_VERSION_QUERY_PARAM,
  STATUS_CODES,
} from "../constants/constants";

const useAxiosInstance = () => {
  const { onLogout } = useHeader();

  const intl = useIntl();

  axios.defaults.headers.common["Content-Type"] = "application/json";
  const axiosInstance = axios.create({
    baseURL: Config.REACT_APP_API_URL,
  });

  axiosInstance.interceptors.request.use(async (request) => {
    if (!request.headers[API_VERSION_QUERY_PARAM]) {
      request.headers[API_VERSION_QUERY_PARAM] = API_VERSION_NUMBER;
    }
    const token = (await CookieAndStorageService.get({ key: "auth" })) || null;
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      if (
        response.status === STATUS_CODES.UNAUTHORIZED_USER &&
        (response?.data?.message ===
          intl.formatMessage({ id: "label.login_with_new_email" }) ||
          response?.data?.message ===
            intl.formatMessage({ id: "label.your_access_has_been_revoked" }))
      ) {
        onLogout({
          message: response?.data?.message,
          isLogoutToast: true,
          isError: false,
        });
        return response;
      }
      if (response.status === STATUS_CODES.UNAUTHORIZED_USER) {
        onLogout({
          message: intl.formatMessage({ id: "label.session_has_expired" }),
          isLogoutToast: true,
          isError: false,
        });
        return response;
      }
      return response;
    },
    (error) => {
      if (
        error.response?.status === STATUS_CODES.UNAUTHORIZED_USER &&
        (error.response?.data?.message ===
          intl.formatMessage({ id: "label.login_with_new_email" }) ||
          error.response?.data?.message ===
            intl.formatMessage({ id: "label.your_access_has_been_revoked" }))
      ) {
        onLogout({
          message: error.response?.data?.message,
          isLogoutToast: true,
          isError: false,
        });
        return Promise.reject(error);
      }
      if (error.response?.status === STATUS_CODES.UNAUTHORIZED_USER) {
        onLogout({
          message: intl.formatMessage({ id: "label.session_has_expired" }),
          isLogoutToast: true,
          isError: false,
        });
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );

  return { axiosInstance };
};

export default useAxiosInstance;
