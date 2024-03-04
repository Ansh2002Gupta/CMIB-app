import { useState } from "react";
import Http from "../../../http-service";

import { API_STATUS, STATUS_CODES } from "../../../../constants/constants";
import { COMPANY_PROFILE } from "../../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";

const useUpdateCompanyProfile = () => {
  const [updateProfileStaus, setUpdateProfileStatus] = useState(
    API_STATUS.IDLE
  );
  const [updateProfileResult, setUpdateProfileResult] = useState([]);
  const [updationError, setUpdationError] = useState("");

  const handleUpdateProfile = async (payload) => {
    setUpdateProfileStatus(API_STATUS.LOADING);
    setUpdationError("");
    try {
      const res = await Http.put(COMPANY_PROFILE, payload);
      if (
        res.status === STATUS_CODES.SUCCESS_STATUS ||
        res.code === STATUS_CODES.SUCCESS_STATUS
      ) {
        setUpdateProfileStatus(API_STATUS.SUCCESS);
        setUpdateProfileResult(res.data);
      } else {
        setUpdateProfileStatus(API_STATUS.ERROR);
        setUpdationError(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      setUpdationError(errorMessage);
      setUpdateProfileStatus(API_STATUS.ERROR);
    }
  };

  const isLoading = updateProfileStaus === API_STATUS.LOADING;
  const isSuccess = updateProfileStaus === API_STATUS.SUCCESS;
  const isError = updateProfileStaus === API_STATUS.ERROR;

  return {
    handleUpdateProfile,
    isError,
    isLoading,
    isSuccess,
    setUpdationError,
    updateProfileResult,
    updationError,
    updateProfileStaus,
  };
};

export default useUpdateCompanyProfile;
