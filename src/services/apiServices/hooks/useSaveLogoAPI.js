import { useState } from "react";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";

const useSaveLogo = () => {
  const [uploadStatus, setUploadStatus] = useState(API_STATUS.IDLE);
  const [fileUploadResult, setFileUploadResult] = useState([]);
  const [errorWhileUpload, setErrorWhileUpload] = useState("");

  const handleFileUpload = async (file) => {
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
        return;
      }
      setUploadStatus(API_STATUS.ERROR);
      setErrorWhileUpload(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      setUploadStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileUpload(err.response?.data?.message);
        return;
      }
      setErrorWhileUpload(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };

  const isLoading = uploadStatus === API_STATUS.LOADING;
  const isSuccess = uploadStatus === API_STATUS.SUCCESS;
  const isError = uploadStatus === API_STATUS.ERROR;

  return {
    fileUploadResult,
    errorWhileUpload,
    uploadStatus,
    handleFileUpload,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useSaveLogo;
