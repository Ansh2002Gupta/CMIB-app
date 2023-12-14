import { useState } from "react";

import Http from "../http-service";
import { API_STATUS, STATUS_CODES } from "../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";

const useDeleteLogo = () => {
  const [deletionStatus, setDeletionStatus] = useState(API_STATUS.IDLE);
  const [fileDeletionResult, setFileDeletionResult] = useState([]);
  const [errorWhileDeletion, setErrorWhileDeletion] = useState("");

  const handleDeleteLogo = async (payload) => {
    try {
      setDeletionStatus(API_STATUS.LOADING);
      errorWhileDeletion && setErrorWhileDeletion("");
      const res = await Http.post(`company/delete-logo`, payload);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setDeletionStatus(API_STATUS.SUCCESS);
        setFileDeletionResult(res.data);
        return;
      }
      setDeletionStatus(API_STATUS.ERROR);
      setErrorWhileDeletion(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      setDeletionStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileDeletion(err.response?.data?.message);
        return;
      }
      setErrorWhileDeletion(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };

  const isLoading = deletionStatus === API_STATUS.LOADING;
  const isSuccess = deletionStatus === API_STATUS.SUCCESS;
  const isError = deletionStatus === API_STATUS.ERROR;

  return {
    fileDeletionResult,
    errorWhileDeletion,
    deletionStatus,
    handleDeleteLogo,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useDeleteLogo;
