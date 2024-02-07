import { useState } from "react";

import Http from "../../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../../constants/constants";
import { COMPANY_DELETE_USER } from "../../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";

const useDeleteUserAPI = () => {
  const [deletionStatus, setDeletionStatus] = useState(API_STATUS.IDLE);
  const [userDeletionResult, setUserDeletionResult] = useState([]);
  const [errorWhileDeletion, setErrorWhileDeletion] = useState("");

  const handleDeleteUser = async ({ successCallback }) => {
    try {
      setDeletionStatus(API_STATUS.LOADING);
      errorWhileDeletion && setErrorWhileDeletion("");
      const res = await Http.delete(COMPANY_DELETE_USER);
      if (
        res.status === STATUS_CODES.SUCCESS_STATUS ||
        res.code === STATUS_CODES.SUCCESS_STATUS
      ) {
        setDeletionStatus(API_STATUS.SUCCESS);
        setUserDeletionResult(res.data);
        successCallback && successCallback();
        return;
      }
      errorCallback && errorCallback();
      setDeletionStatus(API_STATUS.ERROR);
      setErrorWhileDeletion(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      setDeletionStatus(API_STATUS.ERROR);
      setErrorWhileDeletion(
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE
      );
    }
  };

  const isLoading = deletionStatus === API_STATUS.LOADING;
  const isSuccess = deletionStatus === API_STATUS.SUCCESS;
  const isError = deletionStatus === API_STATUS.ERROR;

  return {
    deletionStatus,
    errorWhileDeletion,
    userDeletionResult,
    handleDeleteUser,
    isError,
    isLoading,
    isSuccess,
    setErrorWhileDeletion,
  };
};

export default useDeleteUserAPI;
