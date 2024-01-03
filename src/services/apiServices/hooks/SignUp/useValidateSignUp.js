import { useState } from "react";
import Http from "../../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../../constants/constants";
import { COMPANY_VALIDATE_SIGN_UP } from "../../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";

const useValidateSignUp = () => {
  const [postStatus, setPostStatus] = useState(API_STATUS.IDLE);
  const [validateResult, setValidateResult] = useState([]);
  const [validationError, setValidationError] = useState("");

  const handleSignUpValidation = async (payload, successCallback) => {
    setPostStatus(API_STATUS.LOADING);
    setValidationError("");
    try {
      const res = await Http.post(COMPANY_VALIDATE_SIGN_UP, payload);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setPostStatus(API_STATUS.SUCCESS);
        setValidateResult(res.data);
        successCallback();
      } else {
        setPostStatus(API_STATUS.ERROR);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      setValidationError(errorMessage);
      setPostStatus(API_STATUS.ERROR);
    }
  };

  const isLoading = postStatus === API_STATUS.LOADING;
  const isSuccess = postStatus === API_STATUS.SUCCESS;
  const isError = postStatus === API_STATUS.ERROR;

  return {
    validateResult,
    validationError,
    postStatus,
    handleSignUpValidation,
    isError,
    isLoading,
    isSuccess,
    setValidationError,
  };
};

export default useValidateSignUp;
