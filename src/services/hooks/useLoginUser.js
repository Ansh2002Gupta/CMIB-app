import { useState } from "react";

import Http from "../http-service";
import { API_STATUS, STATUS_CODES } from "../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";

const useLoginUser = () => {
  const [postStatus, setPostStatus] = useState(API_STATUS.IDLE);
  const [loginUserResult, setLoginUserResult] = useState([]);
  const [errorWhileLoggingIn, setErrorWhileLoggingIn] = useState("");

  const handleUserLogin = async (payload) => {
    try {
      setPostStatus(API_STATUS.LOADING);
      errorWhileLoggingIn && setErrorWhileLoggingIn("");
      const res = await Http.post(`company/login`, payload);
      console.log('result result', res.status);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setPostStatus(API_STATUS.SUCCESS);
        setLoginUserResult(res.data);
        return;
      }
      setPostStatus(API_STATUS.ERROR);
    } catch (err) {
      setPostStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileLoggingIn(err.response?.data?.message);
        return;
      }
      setErrorWhileLoggingIn(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };
  
  const isLoading = postStatus === API_STATUS.LOADING;
  const isSuccess = postStatus === API_STATUS.SUCCESS;
  const isError = postStatus === API_STATUS.ERROR;

  return {
    loginUserResult,
    errorWhileLoggingIn,
    postStatus,
    handleUserLogin,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useLoginUser;
