import { useState } from "react";
import useHttpService from "../../../hooks/useHttpService";
import { API_STATUS, STATUS_CODES } from "../../../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";
import { appendStringsInNextLine } from "../../../../utils/util";

const useUpdateService = (url) => {
  const [status, setStatus] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState([]);
  const { Http } = useHttpService();

  const handleUpdate = async (data, successCallback) => {
    setStatus(API_STATUS.LOADING);
    setError("");
    try {
      const res = await Http.put(url, data);
      if (
        res.status === STATUS_CODES.SUCCESS_STATUS ||
        res.code === STATUS_CODES.SUCCESS_STATUS
      ) {
        setStatus(API_STATUS.SUCCESS);
        setResult(res.data);
        successCallback && successCallback();
      } else {
        setStatus(API_STATUS.ERROR);
        setError(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
      }
      return res;
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
      setStatus(API_STATUS.ERROR);
      setError(errorMessage);
    }
  };

  const isLoading = status === API_STATUS.LOADING;
  const isSuccess = status === API_STATUS.SUCCESS;
  const isError = status === API_STATUS.ERROR;
  return {
    handleUpdate,
    isError,
    isLoading,
    isSuccess,
    error,
    result,
  };
};

export default useUpdateService;
