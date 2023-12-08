import { useState } from "react";

import Http from "../http-service";
import { API_STATUS, STATUS_CODES } from "../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";

const useSaveLogo = () => {
  const [postStatus, setPostStatus] = useState(API_STATUS.IDLE);
  const [fileUploadResult, setFileUploadResult] = useState([]);
  const [errorWhileUpload, setErrorWhileUpload] = useState("");

  const handleFileUpload = async (file) => {
    try {
      setPostStatus(API_STATUS.LOADING);
      errorWhileUpload && setErrorWhileUpload("");

      const formData = new FormData();
      formData.append("logo", file);

      const res = await Http.post(`company/save-logo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setPostStatus(API_STATUS.SUCCESS);
        setFileUploadResult(res.data);
        return;
      }
      setPostStatus(API_STATUS.ERROR);
    } catch (err) {
      setPostStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileUpload(err.response?.data?.message);
        return;
      }
      setErrorWhileUpload(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };

  const isLoading = postStatus === API_STATUS.LOADING;
  const isSuccess = postStatus === API_STATUS.SUCCESS;
  const isError = postStatus === API_STATUS.ERROR;

  return {
    fileUploadResult,
    errorWhileUpload,
    postStatus,
    handleFileUpload,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useSaveLogo;
