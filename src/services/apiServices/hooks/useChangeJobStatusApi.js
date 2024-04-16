import { useState } from "react";

import useHttpService from "../../hooks/useHttpService";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { CHANGE_STATUS, POST_JOB } from "../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";

const useChangeJobStatusApi = () => {
  const [changeJobStatus, setChangeJobStatus] = useState(API_STATUS.IDLE);
  const [changeJobStatusResult, setChangeJobStatusResult] = useState([]);
  const [errorWhileJobChange, setErrorWhileJobChange] = useState("");

  const { Http } = useHttpService();

  const handleUseChangeJob = async (id) => {
    try {
      setChangeJobStatus(API_STATUS.LOADING);
      errorWhileJobChange && setErrorWhileJobChange("");
      const res = await Http.patch(`${POST_JOB}/${id}${CHANGE_STATUS}`);
      if (
        res.status === STATUS_CODES.SUCCESS_STATUS ||
        res.code === STATUS_CODES.SUCCESS_STATUS
      ) {
        setChangeJobStatus(API_STATUS.SUCCESS);
        setChangeJobStatusResult(res.data);
        return;
      }
      setChangeJobStatus(API_STATUS.ERROR);
      setErrorWhileJobChange(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      setChangeJobStatus(API_STATUS.ERROR);
      setErrorWhileJobChange(
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE
      );
    }
  };

  const isLoading = changeJobStatus === API_STATUS.LOADING;
  const isSuccess = changeJobStatus === API_STATUS.SUCCESS;
  const isError = changeJobStatus === API_STATUS.ERROR;

  return {
    changeJobStatusResult,
    changeJobStatus,
    errorWhileJobChange,
    setErrorWhileJobChange,
    handleUseChangeJob,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useChangeJobStatusApi;
