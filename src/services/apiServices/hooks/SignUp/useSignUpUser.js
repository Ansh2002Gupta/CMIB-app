import { useState } from "react";

import Http from "../../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";

const useSignUpUser = () => {
  const [postStatus, setPostStatus] = useState(API_STATUS.IDLE);
  const [signUpUserResult, setSignUpUserResult] = useState([]);
  const [signUpError, setSignUpError] = useState("");

  const handleSignUp = async (payload, successCallback) => {
    try {
      setPostStatus(API_STATUS.LOADING);
      signUpError && setSignUpError("");
      const res = await Http.post(`company/sign-up`, payload);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setPostStatus(API_STATUS.SUCCESS);
        setSignUpUserResult(res.data);
        successCallback();
        return;
      }
      setPostStatus(API_STATUS.ERROR);
      setSignUpError(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      setPostStatus(API_STATUS.ERROR);
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      setSignUpError(errorMessage);
    }
  };

  const isLoading = postStatus === API_STATUS.LOADING;
  const isSuccess = postStatus === API_STATUS.SUCCESS;
  const isError = postStatus === API_STATUS.ERROR;

  return {
    handleSignUp,
    isError,
    isLoading,
    isSuccess,
    setSignUpError,
    signUpError,
    signUpUserResult,
    postStatus,
  };
};

export default useSignUpUser;
