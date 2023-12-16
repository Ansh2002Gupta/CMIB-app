import { useState } from "react";

import Http from "../../http-service";
import useNavigateScreen from "../../hooks/useNavigateScreen";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";
import { navigations } from "../../../constants/routeNames";

const useChangePasswordApi = () => {
  const [postStatus, setPostStatus] = useState(API_STATUS.IDLE);
  const [changePasswordResult, setChangePasswordResult] = useState([]);
  const [errorWhileChangePassword, setErrorWhileChangePassword] = useState("");

  const { navigateScreen } = useNavigateScreen();

  const handleUseChangePassword = async (payload) => {
    try {
      setPostStatus(API_STATUS.LOADING);
      errorWhileChangePassword && setErrorWhileChangePassword("");
      const res = await Http.post(`company/change-password`, payload);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setPostStatus(API_STATUS.SUCCESS);
        setChangePasswordResult(res.data);
        navigateScreen(navigations.DASHBOARD);
        return;
      }
      setPostStatus(API_STATUS.ERROR);
    } catch (err) {
      setPostStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileChangePassword(err.response?.data?.message);
        return;
      }
      setErrorWhileChangePassword(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };

  const isLoading = postStatus === API_STATUS.LOADING;
  const isSuccess = postStatus === API_STATUS.SUCCESS;
  const isError = postStatus === API_STATUS.ERROR;

  return {
    changePasswordResult,
    errorWhileChangePassword,
    handleUseChangePassword,
    isError,
    isLoading,
    isSuccess,
    postStatus,
  };
};

export default useChangePasswordApi;
