import { useState } from "react";

import useHttpService from "../../hooks/useHttpService";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import {
  CHANGE_APPLICANT_STATUS,
  CHANGE_STATUS,
  POST_JOB,
  STATUS,
} from "../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";

const useChangeApplicantStatusApi = () => {
  const [changeApplicantStatus, setChangeApplicantStatus] = useState(
    API_STATUS.IDLE
  );
  const [changeApplicantStatusResult, setChangeApplicantStatusResult] =
    useState([]);
  const [errorWhileApplicantStatusChange, setErrorWhileApplicantStatusChange] =
    useState("");

  const { Http } = useHttpService();

  const handleUseApplicantStatus = async (id, payload) => {
    try {
      setChangeApplicantStatus(API_STATUS.LOADING);
      errorWhileApplicantStatusChange && setErrorWhileApplicantStatusChange("");
      const res = await Http.patch(
        `${CHANGE_APPLICANT_STATUS}/${id}${STATUS}`,
        payload
      );
      if (
        res.status === STATUS_CODES.SUCCESS_STATUS ||
        res.code === STATUS_CODES.SUCCESS_STATUS
      ) {
        setChangeApplicantStatus(API_STATUS.SUCCESS);
        setChangeApplicantStatusResult(res.data);
        return;
      }
      setChangeApplicantStatus(API_STATUS.ERROR);
      setErrorWhileApplicantStatusChange(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      setChangeApplicantStatus(API_STATUS.ERROR);
      setErrorWhileApplicantStatusChange(
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE
      );
    }
  };

  const isLoading = changeApplicantStatus === API_STATUS.LOADING;
  const isSuccess = changeApplicantStatus === API_STATUS.SUCCESS;
  const isError = changeApplicantStatus === API_STATUS.ERROR;

  return {
    changeApplicantStatusResult,
    changeApplicantStatus,
    errorWhileApplicantStatusChange,
    setErrorWhileApplicantStatusChange,
    handleUseApplicantStatus,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useChangeApplicantStatusApi;
