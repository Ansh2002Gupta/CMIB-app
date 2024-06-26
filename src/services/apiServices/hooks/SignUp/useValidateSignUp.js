import { useState } from "react";

import useHttpService from "../../../hooks/useHttpService";
import { API_STATUS, STATUS_CODES } from "../../../../constants/constants";
import { COMPANY_VALIDATE_SIGN_UP } from "../../apiEndPoint";
import { appendStringsInNextLine } from "../../../../utils/util";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";

const useValidateSignUp = () => {
  const [postStatus, setPostStatus] = useState(API_STATUS.IDLE);
  const [validateResult, setValidateResult] = useState([]);
  const [validationError, setValidationError] = useState("");

  const { Http } = useHttpService();

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
      let errorMessage;
      const errors = err.response?.data?.data?.errors;

      if (errors) {
        const errorMessages = [];
        for (const field in errors) {
          if (errors.hasOwnProperty(field)) {
            errorMessages.push(errors[field][0]);
          }
        }
        errorMessage = appendStringsInNextLine(errorMessages);
      } else {
        errorMessage =
          err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      }

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
