import { useState } from "react";

import useHttpService from "../../hooks/useHttpService";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { COMPANY_RESET_PASSWORD_OTP } from "../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";

const useResetPasswordAPI = () => {
  const [resetPasswordResult, setResetPasswordResult] = useState({});
  const [errorWhileResetPassword, setErrorWhileResetPassword] = useState("");
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);

  const { Http } = useHttpService();

  const handleResetPasswordAPI = async (payload) => {
    try {
      setApiStatus(API_STATUS.LOADING);
      errorWhileResetPassword && setErrorWhileResetPassword("");
      const res = await Http.patch(COMPANY_RESET_PASSWORD_OTP, payload);
      if (
        res.status === STATUS_CODES.SUCCESS_STATUS ||
        res.code === STATUS_CODES.SUCCESS_STATUS
      ) {
        setApiStatus(API_STATUS.SUCCESS);
        setResetPasswordResult(res);
        return;
      }
      setApiStatus(API_STATUS.ERROR);
      setErrorWhileResetPassword(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
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
    handleResetPasswordAPI,
    isError,
    isLoading,
    isSuccess,
    resetPasswordResult,
    setErrorWhileResetPassword,
    setResetPasswordResult,
  };
};

export default useResetPasswordAPI;
