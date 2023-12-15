import { useState } from "react";
import Http from "../../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";

const useValidateSignUp = () => {
  const [postStatus, setPostStatus] = useState(API_STATUS.IDLE);
  const [validateResult, setValidateResult] = useState([]);
  const [error, setError] = useState("");

  const handleSignUpValidation = async (
    payload,
    successCallback,
    errorCallback
  ) => {
    setPostStatus(API_STATUS.LOADING);
    setError("");
    try {
      const res = await Http.post(`company/sign-up/validate`, payload);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setPostStatus(API_STATUS.SUCCESS);
        setValidateResult(res.data);
        successCallback();
      } else {
        setPostStatus(API_STATUS.ERROR);
        errorCallback(res);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      setError(errorMessage);
      errorCallback(errorMessage);
      setPostStatus(API_STATUS.ERROR);
    }
  };

  const isLoading = postStatus === API_STATUS.LOADING;
  const isSuccess = postStatus === API_STATUS.SUCCESS;
  const isError = postStatus === API_STATUS.ERROR;

  return {
    validateResult,
    error,
    postStatus,
    handleSignUpValidation,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useValidateSignUp;
