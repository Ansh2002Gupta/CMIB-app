import { useState } from "react";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";

const useGetStates = () => {
  const [getStatus, setGetStatus] = useState(API_STATUS.IDLE);
  const [stateResult, setStateResult] = useState(null);
  const [error, setError] = useState("");

  const getStates = async () => {
    try {
      setGetStatus(API_STATUS.LOADING);
      setError("");
      const res = await Http.get(`core/all-states`);
      if (res.code === STATUS_CODES.SUCCESS_STATUS) {
        setGetStatus(API_STATUS.SUCCESS);
        setStateResult(res.data);
        return;
      }
      setGetStatus(API_STATUS.ERROR);
    } catch (err) {
      setGetStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setError(err.response?.data?.message);
        return;
      }
      setError(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };

  const isLoading = getStatus === API_STATUS.LOADING;
  const isSuccess = getStatus === API_STATUS.SUCCESS;
  const isError = getStatus === API_STATUS.ERROR;

  return {
    error,
    stateResult,
    getStates,
    isError,
    isLoading,
    isSuccess,
    getStatus,
  };
};

export default useGetStates;
