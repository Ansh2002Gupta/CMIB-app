import { useState } from "react";

import Http from "../../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";

const useSignUpUser = () => {
  const [postStatus, setPostStatus] = useState(API_STATUS.IDLE);
  const [signUpUserResult, setSignUpUserResult] = useState([]);
  const [error, setError] = useState("");

  const handleSignUp = async (payload, successCallback, errorCallback) => {
    try {
      setPostStatus(API_STATUS.LOADING);
      error && setError("");
      const res = await Http.post(`company/sign-up`, payload);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setPostStatus(API_STATUS.SUCCESS);
        setSignUpUserResult(res.data);
        successCallback();
        return;
      }
      errorCallback(res);
      setPostStatus(API_STATUS.ERROR);
      setError(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      setPostStatus(API_STATUS.ERROR);
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      setError(errorMessage);
      errorCallback(errorMessage);
    }
  };

  const isLoading = postStatus === API_STATUS.LOADING;
  const isSuccess = postStatus === API_STATUS.SUCCESS;
  const isError = postStatus === API_STATUS.ERROR;

  return {
    signUpUserResult,
    setError,
    postStatus,
    handleSignUp,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useSignUpUser;
