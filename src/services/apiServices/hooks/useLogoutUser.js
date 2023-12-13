import { useState } from "react";

import Http from "../../http-service";
import Storage from "../../storage-service";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";

const useLogoutUser = () => {
  const [postStatus, setPostStatus] = useState(API_STATUS.IDLE);
  const [loginUserResult, setLoginUserResult] = useState([]);
  const [errorWhileLoggingOut, setErrorWhileLoggingOut] = useState("");

  const handleUserLogout = async (payload) => {
    try {
      setPostStatus(API_STATUS.LOADING);
      errorWhileLoggingOut && setErrorWhileLoggingOut("");
      const res = await Http.post(`company/logout`, payload);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setPostStatus(API_STATUS.SUCCESS);
        await Storage.removeAll();
        setLoginUserResult(res.data);
        return;
      }
      setPostStatus(API_STATUS.ERROR);
    } catch (err) {
      setPostStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileLoggingOut(err.response?.data?.message);
        return;
      }
      setErrorWhileLoggingOut(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };

  const isLoading = postStatus === API_STATUS.LOADING;
  const isSuccess = postStatus === API_STATUS.SUCCESS;
  const isError = postStatus === API_STATUS.ERROR;

  return {
    errorWhileLoggingOut,
    handleUserLogout,
    isError,
    isLoading,
    isSuccess,
    loginUserResult,
    postStatus,
  };
};

export default useLogoutUser;
