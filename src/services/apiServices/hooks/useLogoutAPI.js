import { useState, useContext } from "react";

import CookieAndStorageService from "../../cookie-and-storage-service";
import Http from "../../http-service";
import { AuthContext } from "../../../globalContext/auth/authProvider";
import { clearAuthAndLogout } from "../../../globalContext/auth/authActions";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";
import { COMPANY_LOGOUT } from "../apiEndPoint";

const useLogoutAPI = () => {
  const [logoutApiStatus, setLogoutApiStatus] = useState(API_STATUS.IDLE);
  const [loginUserResult, setLoginUserResult] = useState([]);
  const [errorWhileLoggingOut, setErrorWhileLoggingOut] = useState("");
  const [, authDispatch] = useContext(AuthContext);

  const handleUserLogout = async (successCallback) => {
    try {
      setLogoutApiStatus(API_STATUS.LOADING);
      errorWhileLoggingOut && setErrorWhileLoggingOut("");
      const res = await Http.post(COMPANY_LOGOUT);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setLogoutApiStatus(API_STATUS.SUCCESS);
        await CookieAndStorageService.removeAll();
        authDispatch(clearAuthAndLogout());
        setLoginUserResult(res.data);
        successCallback();
        return;
      }
      setLogoutApiStatus(API_STATUS.ERROR);
      setErrorWhileLoggingOut(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      setLogoutApiStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileLoggingOut(err.response?.data?.message);
        return;
      }
      setErrorWhileLoggingOut(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };

  const isLoading = logoutApiStatus === API_STATUS.LOADING;
  const isSuccess = logoutApiStatus === API_STATUS.SUCCESS;
  const isError = logoutApiStatus === API_STATUS.ERROR;

  return {
    errorWhileLoggingOut,
    handleUserLogout,
    isError,
    isLoading,
    isSuccess,
    loginUserResult,
    logoutApiStatus,
  };
};

export default useLogoutAPI;
