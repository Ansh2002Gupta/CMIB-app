import { useState } from "react";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";
import { COMPANY_LOGOUT } from "../apiEndPoint";

const useLogoutAPI = () => {
  const [logoutApiStatus, setLogoutApiStatus] = useState(API_STATUS.IDLE);
  const [loginUserResult, setLoginUserResult] = useState([]);
  const [errorWhileLoggingOut, setErrorWhileLoggingOut] = useState("");

  const handleUserLogout = async ({ successCallback }) => {
    try {
      setLogoutApiStatus(API_STATUS.LOADING);
      errorWhileLoggingOut && setErrorWhileLoggingOut("");
      const res = await Http.post(COMPANY_LOGOUT);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setLogoutApiStatus(API_STATUS.SUCCESS);
        setLoginUserResult(res.data);
        successCallback && successCallback();
        return;
      }
      setLogoutApiStatus(API_STATUS.ERROR);
      setErrorWhileLoggingOut(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      setLogoutApiStatus(API_STATUS.ERROR);
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      setErrorWhileLoggingOut(errorMessage);
    }
  };

  const isLoggingUserOut = logoutApiStatus === API_STATUS.LOADING;
  const isSuccess = logoutApiStatus === API_STATUS.SUCCESS;
  const isError = logoutApiStatus === API_STATUS.ERROR;

  return {
    errorWhileLoggingOut,
    handleUserLogout,
    isError,
    isLoggingUserOut,
    isSuccess,
    loginUserResult,
    logoutApiStatus,
  };
};

export default useLogoutAPI;
