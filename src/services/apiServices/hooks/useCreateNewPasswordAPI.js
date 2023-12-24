import { useState } from "react";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { COMPANY_FORGOT_PASSWORD_OTP } from "../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";

const useCreateNewPasswordAPI = () => {
  const [forgotPasswordResult, setForgotPasswordResult] = useState([]);
  const [errorWhileResetPassword, setErrorWhileResetPassword] = useState("");
  const [changePasswordStatus, setChangePasswordStatus] = useState(
    API_STATUS.IDLE
  );

  const handleCreateNewPasswordAPI = async (
    payload,
    successCallback,
    errorCallback
  ) => {
    try {
      setChangePasswordStatus(API_STATUS.LOADING);
      errorWhileResetPassword && setErrorWhileResetPassword("");
      const res = await Http.post(COMPANY_FORGOT_PASSWORD_OTP, payload);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setChangePasswordStatus(API_STATUS.SUCCESS);
        setForgotPasswordResult(res.data);
        successCallback();
        return;
      }
      setChangePasswordStatus(API_STATUS.ERROR);
      errorCallback(res);
    } catch (err) {
      setChangePasswordStatus(API_STATUS.ERROR);
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      errorCallback(errorMessage);
      setErrorWhileResetPassword(errorMessage);
    }
  };

  const isLoading = changePasswordStatus === API_STATUS.LOADING;
  const isSuccess = changePasswordStatus === API_STATUS.SUCCESS;
  const isError = changePasswordStatus === API_STATUS.ERROR;

  return {
    changePasswordStatus,
    errorWhileResetPassword,
    forgotPasswordResult,
    handleCreateNewPasswordAPI,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useCreateNewPasswordAPI;
