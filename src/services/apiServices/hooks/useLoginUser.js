import { useContext, useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "../../../routes";
import { Platform } from "@unthinkable/react-core-components";

import CookieAndStorageService from "../../cookie-and-storage-service";
import Http from "../../http-service";
import useNavigateScreen from "../../hooks/useNavigateScreen";
import { AuthContext } from "../../../globalContext/auth/authProvider";
import { RouteContext } from "../../../globalContext/route/routeProvider";
import { setAuth } from "../../../globalContext/auth/authActions";
import { COMPANY_LOGIN } from "../apiEndPoint";
import {
  API_STATUS,
  REDIRECT_URL,
  STATUS_CODES,
} from "../../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";
import { navigations } from "../../../constants/routeNames";

const useLoginUser = () => {
  const [, authDispatch] = useContext(AuthContext);
  const [routeState] = useContext(RouteContext);
  const { navigateScreen } = useNavigateScreen();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [postStatus, setPostStatus] = useState(API_STATUS.IDLE);
  const [loginUserResult, setLoginUserResult] = useState([]);
  const [errorWhileLoggingIn, setErrorWhileLoggingIn] = useState("");

  const handleUserLogin = async (payload) => {
    try {
      setPostStatus(API_STATUS.LOADING);
      errorWhileLoggingIn && setErrorWhileLoggingIn("");
      const res = await Http.post(COMPANY_LOGIN, payload);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setPostStatus(API_STATUS.SUCCESS);
        const authToken = res.data.data.access_token;
        await CookieAndStorageService.set({ key: "auth", value: authToken });
        setLoginUserResult(res.data);
        authDispatch(setAuth({ token: authToken }));
        if (searchParams.get(REDIRECT_URL) || location?.state?.redirectPath) {
          if (Platform.OS.toLowerCase() === "web") {
            window.location.replace(
              `${searchParams.get(REDIRECT_URL)}?isAutheticated=1`
            );
          } else {
            navigate(navigations.WEB_VIEW, {
              state: { uri: location.state.redirectPath },
            });
          }
          return;
        }
        navigateScreen(routeState?.loginRedirectRoute || navigations.DASHBOARD);
        return;
      }
      setPostStatus(API_STATUS.ERROR);
    } catch (err) {
      setPostStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileLoggingIn(err.response?.data?.message);
        return;
      }
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
    setErrorWhileLoggingIn,
  };
};

export default useLoginUser;
