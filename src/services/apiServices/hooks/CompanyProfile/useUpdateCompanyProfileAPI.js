import { useState } from "react";

import useHttpService from "../../../hooks/useHttpService";
import { API_STATUS, STATUS_CODES } from "../../../../constants/constants";
import { COMPANY_PROFILE } from "../../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";
import { appendStringsInNextLine } from "../../../../utils/util";

const useUpdateCompanyProfile = () => {
  const [updateProfileStaus, setUpdateProfileStatus] = useState(
    API_STATUS.IDLE
  );
  const [updateProfileResult, setUpdateProfileResult] = useState([]);
  const [updationError, setUpdationError] = useState("");

  const { Http } = useHttpService();

  const handleUpdateProfile = async (payload, successCallback) => {
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
        successCallback && successCallback();
      } else {
        setUpdateProfileStatus(API_STATUS.ERROR);
        setUpdationError(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
      }
    } catch (err) {
      let errorMessage;
      const errors = err.response?.data?.data?.errors;
      if (errors) {
        const errorMessages = [];
        for (const field in errors) {
          if (errors.hasOwnProperty(field)) {
            errorMessages.push(errors[field][0]);
          }
        }
        errorMessage = appendStringsInNextLine(errorMessages);
      } else {
        errorMessage =
          err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      }
      setUpdateProfileStatus(API_STATUS.ERROR);
      setUpdationError(errorMessage);
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
