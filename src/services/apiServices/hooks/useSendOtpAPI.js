import { useState } from "react";

import useHttpService from "../../hooks/useHttpService";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { COMPANY_SEND_OTP } from "../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";

const useSendOtpAPI = () => {
  const [errorWhileResetPassword, setErrorWhileResetPassword] = useState("");
  const [sendOtpResult, setSendOtpResult] = useState([]);
  const [apiStatus, setAPIStatus] = useState(API_STATUS.IDLE);

  const { Http } = useHttpService();

  const handleSendOtpAPI = async ({ payload, errorCallback, url }) => {
    try {
      setAPIStatus(API_STATUS.LOADING);
      errorWhileResetPassword && setErrorWhileResetPassword("");
      const res = await Http.post(url || COMPANY_SEND_OTP, payload);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setAPIStatus(API_STATUS.SUCCESS);
        setSendOtpResult(res.data);
        return;
      }
      setAPIStatus(API_STATUS.ERROR);
      errorCallback && errorCallback(res);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      errorCallback && errorCallback(errorMessage);
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
    setErrorWhileResetPassword,
    sendOtpResult,
    setSendOtpResult,
  };
};

export default useSendOtpAPI;
