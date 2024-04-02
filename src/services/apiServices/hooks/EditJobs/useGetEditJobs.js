import { useState } from "react";

import Http from "../../../../services/http-service";

import { API_STATUS, STATUS_CODES } from "../../../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";
import { POST_JOB } from "../../apiEndPoint";

const useGetEditJobs = (id) => {
  const [gettingStatesStatus, setGettingStatesStatus] = useState(
    API_STATUS.IDLE
  );
  const [stateResult, setStateResult] = useState(null);
  const [error, setError] = useState("");

  const getJobs = async () => {
    try {
      setGettingStatesStatus(API_STATUS.LOADING);
      setError("");
      const res = await Http.get(`${POST_JOB}/${id}`);
      if (res.code === STATUS_CODES.SUCCESS_STATUS) {
        setGettingStatesStatus(API_STATUS.SUCCESS);
        setStateResult(res.data);
        return;
      }
      setGettingStatesStatus(API_STATUS.ERROR);
    } catch (err) {
      setGettingStatesStatus(API_STATUS.ERROR);
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      setError(errorMessage);
    }
  };

  const isLoading = gettingStatesStatus === API_STATUS.LOADING;
  const isSuccess = gettingStatesStatus === API_STATUS.SUCCESS;
  const isError = gettingStatesStatus === API_STATUS.ERROR;

  return {
    error,
    stateResult,
    getJobs,
    isError,
    isLoading,
    isSuccess,
    gettingStatesStatus,
  };
};

export default useGetEditJobs;
