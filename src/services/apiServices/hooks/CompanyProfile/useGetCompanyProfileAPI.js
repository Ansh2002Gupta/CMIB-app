import { useState } from "react";

import Http from "../../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../../constants/constants";
import { COMPANY_PROFILE } from "../../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";

const useResetPasswordAPI = () => {
  const [profileResult, setProfileResult] = useState({});
  const [errorWhileGettingResult, setErrorWhileGettingResult] = useState("");
  const [profileStatus, setProfileStatus] = useState(API_STATUS.IDLE);

  const onGetProfile = async () => {
    try {
      setProfileStatus(API_STATUS.LOADING);
      errorWhileGettingResult && setErrorWhileGettingResult("");
      const res = await Http.get(COMPANY_PROFILE);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setProfileStatus(API_STATUS.SUCCESS);
        setProfileResult(res.data);
        return;
      }
      setProfileStatus(API_STATUS.ERROR);
      setErrorWhileGettingResult(res);
    } catch (err) {
      setProfileStatus(API_STATUS.ERROR);
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      if (errorMessage) {
        setErrorWhileGettingResult(errorMessage);
        return;
      }
      setErrorWhileGettingResult(errorMessage);
    }
  };

  const isLoading = profileStatus === API_STATUS.LOADING;
  const isSuccess = profileStatus === API_STATUS.SUCCESS;
  const isError = profileStatus === API_STATUS.ERROR;

  return {
    profileStatus,
    errorWhileGettingResult,
    onGetProfile,
    isError,
    isLoading,
    isSuccess,
    profileResult,
    setErrorWhileGettingResult,
    setProfileResult,
  };
};

export default useResetPasswordAPI;
