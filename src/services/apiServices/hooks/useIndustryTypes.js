import { useState } from "react";

import useHttpService from "../../hooks/useHttpService";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { CORE_INDUSTRY_TYPE } from "../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";

const useIndustryTypes = () => {
  const [getStatus, setGetStatus] = useState(API_STATUS.IDLE);
  const [industryTypeResult, setIndustryTypeResult] = useState(null);
  const [error, setError] = useState("");

  const { Http } = useHttpService();

  const getIndustryTypes = async () => {
    try {
      setGetStatus(API_STATUS.LOADING);
      setError("");
      const res = await Http.get(CORE_INDUSTRY_TYPE);
      if (res.code === STATUS_CODES.SUCCESS_STATUS) {
        setGetStatus(API_STATUS.SUCCESS);
        setIndustryTypeResult(res.data);
        return;
      }
      setGetStatus(API_STATUS.ERROR);
    } catch (err) {
      setGetStatus(API_STATUS.ERROR);
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      setError(errorMessage);
    }
  };

  const isLoading = getStatus === API_STATUS.LOADING;
  const isSuccess = getStatus === API_STATUS.SUCCESS;
  const isError = getStatus === API_STATUS.ERROR;

  return {
    error,
    industryTypeResult,
    getIndustryTypes,
    isError,
    isLoading,
    isSuccess,
    getStatus,
  };
};

export default useIndustryTypes;
