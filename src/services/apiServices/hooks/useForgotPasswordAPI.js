import { useState } from "react";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import {COMPANY_RESET_PASSWORD_OTP} from "../apiEndPoint"
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";

const useForgotPasswordAPI = () => {
  const [isShowOtpView, setIsShowOtpView] = useState(false);
  const [errorWhileResetPassword, setErrorWhileResetPassword] = useState("");
  const [forgotPasswordResult, setForgotPasswordResult] = useState([]);
  const [postStatus, setPostStatus] = useState(API_STATUS.IDLE);

  const handleForgotPasswordAPI = async (payload, isNavigate, errorCallback) => {
    try {
      setPostStatus(API_STATUS.LOADING);
      errorWhileResetPassword && setErrorWhileResetPassword("");
      const res = await Http.post(COMPANY_RESET_PASSWORD_OTP, payload);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setPostStatus(API_STATUS.SUCCESS);
        setForgotPasswordResult(res.data);
        if (isNavigate)
          setIsShowOtpView(true);
        return;
      }else {
        setPostStatus(API_STATUS.ERROR);
        errorCallback(res);
      } 
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
        errorCallback(errorMessage);
      setPostStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileResetPassword(err.response?.data?.message);
        return;
      }
      setErrorWhileResetPassword(GENERIC_GET_API_FAILED_ERROR_MESSAGE); 
    }
  };

  const isLoading = postStatus === API_STATUS.LOADING;
  const isSuccess = postStatus === API_STATUS.SUCCESS;
  const isError = postStatus === API_STATUS.ERROR;
  
  return {
    errorWhileResetPassword,
    forgotPasswordResult,
    handleForgotPasswordAPI,
    isError,
    isLoading,
    isShowOtpView,
    isSuccess,
    postStatus,
  };
};
export default useForgotPasswordAPI;
