import { useState } from "react";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { COMPANY_SEND_OTP } from "../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";

const useSendOtpAPI = () => {
  const [isShowOtpView, setIsShowOtpView] = useState(false);
  const [errorWhileResetPassword, setErrorWhileResetPassword] = useState("");
  const [sendOtpResult, setSendOtpResult] = useState([]);
  const [apiStatus, setAPIStatus] = useState(API_STATUS.IDLE);

  const resetOtpView = () => {
    setIsShowOtpView(false);
  };

  const handleSendOtpAPI = async (payload, isNavigate, errorCallback, url) => {
    try {
      setAPIStatus(API_STATUS.LOADING);
      errorWhileResetPassword && setErrorWhileResetPassword("");
      const res = await Http.post(url || COMPANY_SEND_OTP, payload);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setAPIStatus(API_STATUS.SUCCESS);
        setSendOtpResult(res.data);
        setIsShowOtpView(true);
        return;
      } else {
        setAPIStatus(API_STATUS.ERROR);
        errorCallback(res);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      errorCallback(errorMessage);
      setAPIStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileResetPassword(err.response?.data?.message);
        return;
      }
      setErrorWhileResetPassword(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };

  const isLoading = apiStatus === API_STATUS.LOADING;
  const isSuccess = apiStatus === API_STATUS.SUCCESS;
  const isError = apiStatus === API_STATUS.ERROR;

  return {
    apiStatus,
    errorWhileResetPassword,
    handleSendOtpAPI,
    isError,
    isLoading,
    isSuccess,
    isShowOtpView,
    resetOtpView,
    sendOtpResult,
    setSendOtpResult,
    setErrorWhileResetPassword,
  };
};

export default useSendOtpAPI;
