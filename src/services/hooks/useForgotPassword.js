import { useState } from "react";

import Http from "../http-service";
import { API_STATUS, STATUS_CODES } from "../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";

const useForgotPassword = () => {
  const [postStatus, setPostStatus] = useState(API_STATUS.IDLE);
  const [forgotPasswordResult, setForgotPasswordResult] = useState([]);
  const [errorWhileResetPassword, setErrorWhileResetPassword] = useState("");

  const handleForgotPassword = async (payload) => {
    try {
      setPostStatus(API_STATUS.LOADING);
      errorWhileResetPassword && setErrorWhileResetPassword("");
      console.log("@@@@");
      const res = await Http.post(`company/reset-password`, payload);
      console.log("####");
      console.log("result result", res.status);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setPostStatus(API_STATUS.SUCCESS);
        setForgotPasswordResult(res.data);
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

  console.log(postStatus, "postStatus");
  const isLoading = postStatus === API_STATUS.LOADING;
  const isSuccess = postStatus === API_STATUS.SUCCESS;
  const isError = postStatus === API_STATUS.ERROR;
  console.log("error forgot", errorWhileResetPassword);
  return {
    forgotPasswordResult,
    errorWhileResetPassword,
    postStatus,
    handleForgotPassword,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useForgotPassword;
