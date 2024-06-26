import { useState } from "react";

import useHttpService from "../../hooks/useHttpService";
import { useHeader } from "../../../hooks/useHeader";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { COMPANY_CHANGE_PASSWORD_OTP } from "../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";

const useChangePasswordApi = () => {
  const { onLogout } = useHeader();

  const [changePasswordStatus, setChangePasswordStatus] = useState(
    API_STATUS.IDLE
  );
  const [changePasswordResult, setChangePasswordResult] = useState([]);
  const [errorWhileChangePassword, setErrorWhileChangePassword] = useState("");

  const { Http } = useHttpService();

  const handleUseChangePassword = async (payload) => {
    try {
      setChangePasswordStatus(API_STATUS.LOADING);
      errorWhileChangePassword && setErrorWhileChangePassword("");
      const res = await Http.patch(COMPANY_CHANGE_PASSWORD_OTP, payload);
      if (
        res.status === STATUS_CODES.SUCCESS_STATUS ||
        res.code === STATUS_CODES.SUCCESS_STATUS
      ) {
        setChangePasswordStatus(API_STATUS.SUCCESS);
        setChangePasswordResult(res.data);
        setTimeout(async () => await onLogout(), 3000);
        return;
      }
      setChangePasswordStatus(API_STATUS.ERROR);
      setErrorWhileChangePassword(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      setChangePasswordStatus(API_STATUS.ERROR);
      setErrorWhileChangePassword(
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE
      );
    }
  };

  const isLoading = changePasswordStatus === API_STATUS.LOADING;
  const isSuccess = changePasswordStatus === API_STATUS.SUCCESS;
  const isError = changePasswordStatus === API_STATUS.ERROR;

  return {
    changePasswordResult,
    changePasswordStatus,
    errorWhileChangePassword,
    setErrorWhileChangePassword,
    handleUseChangePassword,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useChangePasswordApi;
