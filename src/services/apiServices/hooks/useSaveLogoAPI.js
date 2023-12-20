import { useState } from "react";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";

const useSaveLogo = () => {
  const [uploadStatus, setUploadStatus] = useState(API_STATUS.IDLE);
  const [fileUploadResult, setFileUploadResult] = useState([]);
  const [errorWhileUpload, setErrorWhileUpload] = useState("");

  const handleFileUpload = async (file, successCallback) => {
    try {
      setUploadStatus(API_STATUS.LOADING);
      errorWhileUpload && setErrorWhileUpload("");
      const headers = {
        "Content-Type": "multipart/form-data",
      };

      const res = await Http.post(`company/save-logo`, file, headers);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setUploadStatus(API_STATUS.SUCCESS);
        setFileUploadResult(res.data);
        successCallback();
        return;
      }
      setUploadStatus(API_STATUS.ERROR);
      setErrorWhileUpload(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      if (errorMessage) {
        setErrorWhileUpload(errorMessage);
        return;
      }
      setUploadStatus(API_STATUS.ERROR);
      setErrorWhileUpload(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };

  const isLoading = uploadStatus === API_STATUS.LOADING;
  const isSuccess = uploadStatus === API_STATUS.SUCCESS;
  const isError = uploadStatus === API_STATUS.ERROR;

  return {
    errorWhileUpload,
    fileUploadResult,
    handleFileUpload,
    isError,
    isLoading,
    isSuccess,
    setErrorWhileUpload,
    uploadStatus,
  };
};

export default useSaveLogo;
