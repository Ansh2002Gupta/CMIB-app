import { useState } from "react";

import useHttpService from "../../../hooks/useHttpService";
import { API_STATUS, STATUS_CODES } from "../../../../constants/constants";
import { COMPANY_LOGO } from "../../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";

const useDeleteLogo = () => {
  const [deletionStatus, setDeletionStatus] = useState(API_STATUS.IDLE);
  const [fileDeletionResult, setFileDeletionResult] = useState([]);
  const [errorWhileDeletion, setErrorWhileDeletion] = useState("");

  const { Http } = useHttpService();

  const handleDeleteLogo = async (fileName, successCallback) => {
    try {
      setDeletionStatus(API_STATUS.LOADING);
      errorWhileDeletion && setErrorWhileDeletion("");
      const res = await Http.delete(`${COMPANY_LOGO}/${fileName}`);
      if (
        res.status === STATUS_CODES.SUCCESS_STATUS ||
        res.code === STATUS_CODES.SUCCESS_STATUS
      ) {
        setDeletionStatus(API_STATUS.SUCCESS);
        setFileDeletionResult(res.data);
        successCallback && successCallback();
        return;
      }
      setDeletionStatus(API_STATUS.ERROR);
      setErrorWhileDeletion(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      setDeletionStatus(API_STATUS.ERROR);
      if (errorMessage) {
        setErrorWhileDeletion(errorMessage);
        return;
      }
      setErrorWhileDeletion(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };

  const isLoading = deletionStatus === API_STATUS.LOADING;
  const isSuccess = deletionStatus === API_STATUS.SUCCESS;
  const isError = deletionStatus === API_STATUS.ERROR;

  return {
    deletionStatus,
    errorWhileDeletion,
    fileDeletionResult,
    handleDeleteLogo,
    isError,
    isLoading,
    isSuccess,
    setErrorWhileDeletion,
  };
};

export default useDeleteLogo;
