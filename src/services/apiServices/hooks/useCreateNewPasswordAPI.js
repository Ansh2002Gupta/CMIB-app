import { useState } from "react";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";


const useCreateNewPasswordAPI = () => {


  const [postStatus, setPostStatus] = useState(API_STATUS.IDLE);
  const [forgotPasswordResult, setForgotPasswordResult] = useState([]);
  const [errorWhileResetPassword, setErrorWhileResetPassword] = useState("");

  const handleCreateNewPasswordAPI = async (payload) => {
    try {
      setPostStatus(API_STATUS.LOADING);
      errorWhileResetPassword && setErrorWhileResetPassword("");
      const res = await Http.post(`company/change-password-otp`, payload);

      console.log("company/change-password-otp ===> ",res)
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setPostStatus(API_STATUS.SUCCESS);
        setForgotPasswordResult(res.data);
        return;
      }
      setPostStatus(API_STATUS.ERROR);
    } catch (err) {
      setPostStatus(API_STATUS.ERROR);

      console.log("company/change-password-otp ===> ",err)

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
    handleCreateNewPasswordAPI,
    isError,
    isLoading,
    isSuccess,
    postStatus,
  };
};

export default useCreateNewPasswordAPI;

/**
 * url  =>   /api/company/forget-password-otp
 * Request 
 {
  "email": "user@example.com",
  "password": "NewPassword123!",
  "password_confirmation": "NewPassword123!",
  "otp": "649682"
}
 * 
 */
