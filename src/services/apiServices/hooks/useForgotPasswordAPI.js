import { useState } from "react";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";
import { useNavigate } from "../../../routes";
import { navigations } from "../../../constants/routeNames";

const useForgotPasswordAPI = () => {

  const [postStatus, setPostStatus] = useState(API_STATUS.IDLE);
  const [forgotPasswordResult, setForgotPasswordResult] = useState([]);
  const [errorWhileResetPassword, setErrorWhileResetPassword] = useState("");

  const navigate = useNavigate();

  const handleForgotPasswordAPI = async (payload, isNavigate) => {
    
    try {
      setPostStatus(API_STATUS.LOADING);
      errorWhileResetPassword && setErrorWhileResetPassword("");
      const res = await Http.post(`company/reset-password-otp`, payload);

      if ( res.status === STATUS_CODES.SUCCESS_STATUS) {
        setPostStatus(API_STATUS.SUCCESS);
        setForgotPasswordResult(res.data);
      
        if(isNavigate)
        navigate(navigations.FORGOT_PASSWORD_OTP,{ state: { email: payload.email } });

        return;
      }
      setPostStatus(API_STATUS.ERROR);
    } catch (err) {
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
    isSuccess,
    postStatus,
  };
};

export default useForgotPasswordAPI;
