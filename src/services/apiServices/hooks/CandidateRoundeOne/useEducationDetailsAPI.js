import { useState } from "react";

import useHttpService from "../../../hooks/useHttpService";
import { API_STATUS, STATUS_CODES } from "../../../../constants/constants";
import { MEMBER_PERSONAL_DETAILS } from "../../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";

const useEducationDetailsApi = () => {
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [educationFilledDetails, setEducationFilledDetails] = useState({});
  const [apiError, setApiError] = useState("");

  const { Http } = useHttpService();

  const fetchFilledData = async () => {
    try {
      setApiStatus(API_STATUS.LOADING);
      apiError && setApiError("");
      
      const res = await Http.get(MEMBER_PERSONAL_DETAILS);
      if (
        res.status === STATUS_CODES.SUCCESS_STATUS ||
        res.code === STATUS_CODES.SUCCESS_STATUS
      ) {
        setApiStatus(API_STATUS.SUCCESS);
        setEducationFilledDetails(res.data);
        
        return;
      }
     
      setApiStatus(API_STATUS.ERROR);
      setApiError(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      setApiStatus(API_STATUS.ERROR);
      setApiError(
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE
      );
    }
  };

  const isLoading = apiStatus === API_STATUS.LOADING;
  const isSuccess = apiStatus === API_STATUS.SUCCESS;
  const isError = apiStatus === API_STATUS.ERROR;

  return {
    apiError,
    apiStatus,
    educationFilledDetails,
    isError,
    isLoading,
    isSuccess,
    fetchFilledData,
  };
};

export default useEducationDetailsApi;
