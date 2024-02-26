import { useState } from "react";

import Http from "../../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../../constants/constants";
import { MEMBER_PERSONAL_DETAILS } from "../../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";

const usePersonalDetailsAPI = () => {
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [personalDetails, setPersonalDetails] = useState({});
  const [apiError, setApiError] = useState("");

  const handlePersonalDetails = async ({ successCallback, errorCallback }) => {
    try {
        setApiStatus(API_STATUS.LOADING);
      apiError && setApiError("");
      const res = await Http.get(MEMBER_PERSONAL_DETAILS);
      if (
        res.status === STATUS_CODES.SUCCESS_STATUS ||
        res.code === STATUS_CODES.SUCCESS_STATUS
      ) {
        setApiStatus(API_STATUS.SUCCESS);
        setPersonalDetails(res.data);
        successCallback && successCallback(res.data);
        return;
      }
      errorCallback && errorCallback();
      setApiStatus(API_STATUS.ERROR);
      setApiError(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
        setApiStatus(API_STATUS.ERROR);
        setApiError(
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE
      );
      errorCallback && errorCallback();
    }
  };

  const isLoading = apiStatus === API_STATUS.LOADING;
  const isSuccess = apiStatus === API_STATUS.SUCCESS;
  const isError = apiStatus === API_STATUS.ERROR;

  return {
    apiError,
    apiStatus,
    handlePersonalDetails,
    isError,
    isLoading,
    isSuccess,
    personalDetails,
  };
};

export default usePersonalDetailsAPI;
