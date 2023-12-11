import { useState } from "react";

import Http from "../http-service";
import { API_STATUS, STATUS_CODES } from "../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";

const useLoginUser = () => {
  const [postStatus, setPostStatus] = useState(API_STATUS.IDLE);
  const [validateResult, setValidateResult] = useState([]);
  const [error, setError] = useState("");

  const handleSignUpValidation = async (payload) => {
    try {
      setPostStatus(API_STATUS.LOADING);
      error && setError("");
      const res = await Http.post(`company/sign-up/validate`, payload);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setPostStatus(API_STATUS.SUCCESS);
        setValidateResult(res.data);
        return;
      }
      setPostStatus(API_STATUS.ERROR);
    } catch (err) {
      setPostStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setError(err.response?.data?.message);
        return;
      }
      setError(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };

  const isLoading = postStatus === API_STATUS.LOADING;
  const isSuccess = postStatus === API_STATUS.SUCCESS;
  const isError = postStatus === API_STATUS.ERROR;

  return {
    validateResult,
    setError,
    postStatus,
    handleSignUpValidation,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useLoginUser;
