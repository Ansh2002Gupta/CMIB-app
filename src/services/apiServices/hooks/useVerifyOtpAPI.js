import { useState } from "react";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";

const useVerifyOtpAPI = () => {
  const [errorWhileResetPassword, setErrorWhileResetPassword] = useState("");
  const [verifyOtpResult, setVerifyOtpResult] = useState([]);
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);

  const handleVerifyOtpAPI = async ({
    endPoint,
    errorCallback,
    payload,
    successCallback,
  }) => {
    try {
      setApiStatus(API_STATUS.LOADING);
      errorWhileResetPassword && setErrorWhileResetPassword("");
      const res = await Http.post(endPoint, payload);
      if (
        res.status === STATUS_CODES.SUCCESS_STATUS ||
        res.code === STATUS_CODES.SUCCESS_STATUS
      ) {
        setApiStatus(API_STATUS.SUCCESS);
        setVerifyOtpResult(res.data);
        successCallback(res.data.data);
        return;
      }
      setApiStatus(API_STATUS.ERROR);
      errorCallback(res);
      setErrorWhileResetPassword(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      setApiStatus(API_STATUS.ERROR);
      setErrorWhileResetPassword(
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE
      );
    }
  };

  const isLoading = apiStatus === API_STATUS.LOADING;
  const isSuccess = apiStatus === API_STATUS.SUCCESS;
  const isError = apiStatus === API_STATUS.ERROR;

  return {
    apiStatus,
    errorWhileResetPassword,
    handleVerifyOtpAPI,
    isError,
    isLoading,
    isSuccess,
    setErrorWhileResetPassword,
    verifyOtpResult,
  };
};
export default useVerifyOtpAPI;
