import { useContext, useState } from "react";
import { useNavigate } from "../../../routes";

import Http from "../../http-service";
import Storage from "../../storage-service";
import { AuthContext } from "../../../globalContext/auth/authProvider";
import { setAuth } from "../../../globalContext/auth/authActions";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";

const useLoginUser = () => {
  const navigate = useNavigate();
  const [postStatus, setPostStatus] = useState(API_STATUS.IDLE);
  const [loginUserResult, setLoginUserResult] = useState([]);
  const [errorWhileLoggingIn, setErrorWhileLoggingIn] = useState("");
  const [, authDispatch] = useContext(AuthContext);

  const handleUserLogin = async (payload) => {
    try {
      setPostStatus(API_STATUS.LOADING);
      errorWhileLoggingIn && setErrorWhileLoggingIn("");
      const res = await Http.post(`company/login`, payload);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setPostStatus(API_STATUS.SUCCESS);
        const authToken = res.data.data.access_token;
        await Storage.set('authToken', authToken);
        setLoginUserResult(res.data);
        authDispatch(setAuth(res));
        navigate('/account');
        return;
      }
      setPostStatus(API_STATUS.ERROR);
    } catch (err) {
      setPostStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        navigate('/account');
        setErrorWhileLoggingIn(err.response?.data?.message);
        return;
      }
      navigate('/account');
      setErrorWhileLoggingIn(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };
  
  const isLoading = postStatus === API_STATUS.LOADING;
  const isSuccess = postStatus === API_STATUS.SUCCESS;
  const isError = postStatus === API_STATUS.ERROR;

  return {
    errorWhileLoggingIn,
    handleUserLogin,
    isError,
    isLoading,
    isSuccess,
    loginUserResult,
    postStatus,
  };
};

export default useLoginUser;
