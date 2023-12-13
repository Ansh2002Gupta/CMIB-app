import { useState, useContext } from "react";

import Http from "../../http-service";
import Storage from "../../storage-service";
import { AuthContext } from "../../../globalContext/auth/authProvider";
import { clearAuthAndLogout } from "../../../globalContext/auth/authActions";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";

const useLogoutAPI = () => {
  const [logoutApiStatus, setLogoutApiStatus] = useState(API_STATUS.IDLE);
  const [loginUserResult, setLoginUserResult] = useState([]);
  const [, authDispatch] = useContext(AuthContext);
  const [errorWhileLoggingOut, setErrorWhileLoggingOut] = useState("");

  const handleUserLogout = async (payload) => {
    try {
      setLogoutApiStatus(API_STATUS.LOADING);
      errorWhileLoggingOut && setErrorWhileLoggingOut("");
      const res = await Http.post(`company/logout`, payload);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setLogoutApiStatus(API_STATUS.SUCCESS);
        await Storage.removeAll();
        authDispatch(clearAuthAndLogout());
        setLoginUserResult(res.data);
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
