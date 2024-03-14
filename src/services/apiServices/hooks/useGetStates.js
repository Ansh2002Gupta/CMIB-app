import { useState } from "react";

import useHttpService from "../../hooks/useHttpService";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { CORE_STATE } from "../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";

const useGetStates = () => {
  const [gettingStatesStatus, setGettingStatesStatus] = useState(
    API_STATUS.IDLE
  );
  const [stateResult, setStateResult] = useState(null);
  const [error, setError] = useState("");

  const { Http } = useHttpService();

  const getStates = async () => {
    try {
      setGettingStatesStatus(API_STATUS.LOADING);
      setError("");
      const res = await Http.get(CORE_STATE);
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
    getStates,
    isError,
    isLoading,
    isSuccess,
    gettingStatesStatus,
  };
};

export default useGetStates;
