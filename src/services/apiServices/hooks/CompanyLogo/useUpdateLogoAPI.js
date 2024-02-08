import { useState } from "react";

import Http from "../../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";
import { USER_PROFILE } from "../../apiEndPoint";

const useUpdateLogoAPI = () => {
  const [updateStatus, setUpdateStatus] = useState(API_STATUS.IDLE);
  const [fileUpdateResult, setFileUpdateResult] = useState(null);
  const [errorWhileUpdate, setErrorWhileUpdate] = useState("");

  const handleFileUpdate = async ({ file, successCallback, errorCallback }) => {
    try {
      setUpdateStatus(API_STATUS.LOADING);
      errorWhileUpdate && setErrorWhileUpdate("");
      const res = await Http.patch(USER_PROFILE, file);
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setUpdateStatus(API_STATUS.SUCCESS);
        setFileUpdateResult(res.data);
        successCallback && successCallback();
        return;
      }
      errorCallback && errorCallback();
      setUpdateStatus(API_STATUS.ERROR);
      setErrorWhileUpdate(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      errorCallback && errorCallback();
      setUpdateStatus(API_STATUS.ERROR);
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      setErrorWhileUpdate(errorMessage);
    }
  };

  const isLoading = updateStatus === API_STATUS.LOADING;
  const isSuccess = updateStatus === API_STATUS.SUCCESS;
  const isError = updateStatus === API_STATUS.ERROR;

  return {
    errorWhileUpdate,
    fileUpdateResult,
    handleFileUpdate,
    isError,
    isLoading,
    isSuccess,
    setErrorWhileUpdate,
    setFileUpdateResult,
    updateStatus,
  };
};

export default useUpdateLogoAPI;
