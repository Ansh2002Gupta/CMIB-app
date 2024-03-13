import { useState } from "react";

import useHttpService from "../../../hooks/useHttpService";
import { API_STATUS, STATUS_CODES } from "../../../../constants/constants";
import { COMPANY_LOGO } from "../../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";

const useSaveLogo = () => {
  const [uploadStatus, setUploadStatus] = useState(API_STATUS.IDLE);
  const [fileUploadResult, setFileUploadResult] = useState(null);
  const [errorWhileUpload, setErrorWhileUpload] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const { Http } = useHttpService();

  const handleFileUpload = async ({ file, successCallback, errorCallback }) => {
    try {
      setUploadStatus(API_STATUS.LOADING);
      errorWhileUpload && setErrorWhileUpload("");
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const otherOptions = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          if (percent < 100) {
            setUploadPercentage(percent);
          }
        },
      };
      const res = await Http.post(COMPANY_LOGO, file, headers, otherOptions);
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setUploadPercentage(100);
        setTimeout(() => {
          setUploadPercentage(0);
        }, 100);
        setUploadStatus(API_STATUS.SUCCESS);
        setFileUploadResult(res.data);
        successCallback && successCallback(res.data);
        return;
      }
      errorCallback && errorCallback();
      setUploadStatus(API_STATUS.ERROR);
      setErrorWhileUpload(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      errorCallback && errorCallback();
      setUploadStatus(API_STATUS.ERROR);
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      setErrorWhileUpload(errorMessage);
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
    setFileUploadResult,
    uploadPercentage,
    uploadStatus,
  };
};

export default useSaveLogo;
