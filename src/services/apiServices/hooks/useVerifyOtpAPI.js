import { useState } from "react";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { COMPANY_VERIFY_OTP } from "../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";

const useVerifyOtpAPI = () => {
  const [errorWhileResetPassword, setErrorWhileResetPassword] = useState("");
  const [verifyOtpResult, setVerifyOtpResult] = useState([]);
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);

  const handleVerifyOtpAPI = async (
    payload,
    successCallback,
    errorCallback
  ) => {
    try {
      setApiStatus(API_STATUS.LOADING);
      errorWhileResetPassword && setErrorWhileResetPassword("");
      const res = await Http.post(COMPANY_VERIFY_OTP, payload);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setApiStatus(API_STATUS.SUCCESS);
        setVerifyOtpResult(res.data);
        successCallback(res.data.data);
        return;
      } 
      setApiStatus(API_STATUS.ERROR);
        errorCallback(res);
      
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      errorCallback(errorMessage);
      setApiStatus(API_STATUS.ERROR);
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
    isError,
    isLoading,
    isSuccess,
    handleVerifyOtpAPI,
    verifyOtpResult,
  };
};
export default useVerifyOtpAPI;
