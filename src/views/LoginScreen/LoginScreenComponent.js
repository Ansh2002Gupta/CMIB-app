import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "../../routes";
import { useTheme } from "@unthinkable/react-theme";

import CookieAndStorageService from "../../services/cookie-and-storage-service";
import LoginScreenUI from "./LoginScreenUI";
import OtpViewComponent from "../OtpView";
import useLoginUser from "../../services/apiServices/hooks/useLoginUser";
import useSendOtpAPI from "../../services/apiServices/hooks/useSendOtpAPI";
import { LogoutContext } from "../../globalContext/logout/logoutProvider";
import { navigations } from "../../constants/routeNames";
import { MEMBER_LOGIN } from "../../services/apiServices/apiEndPoint";
import { MEMBER_VERIFY_OTP } from "../../services/apiServices/apiEndPoint";
import { setLogoutToast } from "../../globalContext/logout/logoutActions";
import { urlService } from "../../services/urlService";
import { validateEmail } from "../../utils/validation";
import { USER_TYPE, USER_TYPE_QUERY_PARAM } from "../../constants/constants";

function LoginScreenComponent() {
  const [logoutState, setLogoutDispatch] = useContext(LogoutContext);
  const { logoutDetails } = logoutState;
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location?.state?.activeTab;
  const icons = useTheme("icons");
  const intl = useIntl();

  const getActiveTab = () => {
    const activeTabQueryParam = urlService.getQueryStringValue(
      USER_TYPE_QUERY_PARAM
    );
    if (activeTabQueryParam === USER_TYPE.MEMBER) {
      return USER_TYPE.MEMBER;
    }
    if (activeTabQueryParam === USER_TYPE.COMPANY) return USER_TYPE.COMPANY;
    urlService.removeParam(USER_TYPE_QUERY_PARAM);
    if (activeTab) {
      return USER_TYPE.COMPANY;
    }
    return USER_TYPE.MEMBER;
  };

  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [srn, setSrnNumber] = useState("");
  const [active, setActive] = useState(getActiveTab() === USER_TYPE.COMPANY);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageForMemberLogin, setErrorMessageForMemberLogin] =
    useState("");
  const [loginDisabled, setLoginDisabled] = useState(true);
  const {
    handleUserLogin,
    isLoading,
    errorWhileLoggingIn,
    setErrorWhileLoggingIn,
  } = useLoginUser();
  const {
    errorWhileResetPassword: errorWhileSendOtp,
    handleSendOtpAPI,
    isLoading: isOtpLoading,
    sendOtpResult,
    setErrorWhileResetPassword: setErrorWhileSendOtp,
    setSendOtpResult,
  } = useSendOtpAPI();

  useEffect(() => {
    if (userName !== "" && password !== "") {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  }, [userName, password]);

  const handleDismissToast = () => {
    setErrorWhileLoggingIn("");
    setErrorWhileSendOtp("");
    setLogoutDispatch(
      setLogoutToast({
        message: "",
        isLogoutToast: false,
        isError: false,
      })
    );
  };

  const onForgotPasswordClick = async () => {
    navigate(navigations.FORGOT_PASSWORD);
  };

  const onCreateNewPasswordClick = async () => {
    navigate(navigations.SIGN_UP);
  };

  const toggleUser = (val, tabName) => {
    setActive(val);
    urlService.setQueryStringValue(USER_TYPE_QUERY_PARAM, tabName);
  };

  const onLogin = () => {
    let error = validateEmail(userName);
    if (error) {
      setErrorMessage(error);
    } else {
      setErrorMessage("");
      handleUserLogin({ email: userName, password: password });
    }
  };

  const onChangePassword = (val) => {
    setPassword(val);
    setErrorMessage("");
  };

  const onChangeUsername = (val) => {
    setuserName(val);
    setErrorMessage("");
  };

  const onChangeSRNNumber = (val) => {
    setSrnNumber(val);
    setErrorMessageForMemberLogin("");
  };

  //use this function to resend otp
  const onLoginForMembers = () => {
    handleSendOtpAPI({
      payload: { srn: srn },
      url: MEMBER_LOGIN,
    });
  };

  const onClickGoToLogin = () => {
    setSendOtpResult([]);
  };

  const confirmOtpHanlder = async (result) => {
    const authToken = result?.token?.access_token;
    await CookieAndStorageService.set({ key: "auth", value: authToken });
    navigate(navigations.REDIRECT);
  };

  return (
    <>
      {!!sendOtpResult?.data ? (
        <OtpViewComponent
          headerText={intl.formatMessage({ id: "label.enter_otp" })}
          description={intl.formatMessage({
            id: "label.otp_text_member_login",
          })}
          onClickGoToLogin={onClickGoToLogin}
          sendOtpResult={sendOtpResult}
          verifyOtpParams={{ token: sendOtpResult?.data[0]?.token }}
          otpVerifyEndPoint={MEMBER_VERIFY_OTP}
          confirmOtpHanlder={(result) => confirmOtpHanlder(result)}
          isMemberLogin
          onLoginForMembers={onLoginForMembers}
        />
      ) : (
        <LoginScreenUI
          {...{
            active,
            errorMessage,
            errorMessageForMemberLogin,
            errorWhileLoggingIn: errorWhileLoggingIn || errorWhileSendOtp,
            handleDismissToast,
            icons,
            intl,
            isLoading: isLoading || isOtpLoading,
            loginDisabled,
            logoutDetails,
            onChangePassword,
            onChangeSRNNumber,
            onChangeUsername,
            onCreateNewPasswordClick,
            onForgotPasswordClick,
            onLogin,
            onLoginForMembers,
            password,
            setSrnNumber,
            srn,
            toggleUser,
            userName,
          }}
        />
      )}
    </>
  );
}

export default LoginScreenComponent;
