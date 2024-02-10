import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "../../routes";
import { useTheme } from "@unthinkable/react-theme";

import LoginScreenUI from "./LoginScreenUI";
import OtpViewComponent from "../OtpView";
import useLoginUser from "../../services/apiServices/hooks/useLoginUser";
import { navigations } from "../../constants/routeNames";
import { validateEmail } from "../../utils/validation";
import { LogoutContext } from "../../globalContext/logout/logoutProvider";
import { setLogoutToast } from "../../globalContext/logout/logoutActions";
import CookieAndStorageService from "../../services/cookie-and-storage-service";
import { MEMBER_LOGIN } from "../../services/apiServices/apiEndPoint";
import useSendOtpAPI from "../../services/apiServices/hooks/useSendOtpAPI";
import { MEMBER_VERIFY_OTP } from "../../services/apiServices/apiEndPoint";

function LoginScreenComponent() {
  const [logoutState, setLogoutDispatch] = useContext(LogoutContext);
  const { logoutDetails } = logoutState;
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location?.state?.activeTab;
  const icons = useTheme("icons");
  const intl = useIntl();

  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [srn, setSrnNumber] = useState("");
  const [active, setActive] = useState(activeTab ? activeTab : false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageForMemberLogin, setErrorMessageForMemberLogin] =
    useState("");
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [loginDisabledForMembers, setLoginDisabledForMembers] = useState(true);
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
    isShowOtpView,
    sendOtpResult,
    setErrorWhileResetPassword: setErrorWhileSendOtp,
    resetOtpView,
  } = useSendOtpAPI();

  useEffect(() => {
    if (userName !== "" && password !== "") {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  }, [userName, password]);

  useEffect(() => {
    if (srn !== "") {
      setLoginDisabledForMembers(false);
    } else {
      setLoginDisabledForMembers(true);
    }
  }, [srn]);

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

  const toggleUser = (val) => {
    setActive(val);
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
  const onLoginForMembers = () => {
    handleSendOtpAPI({
      payload: { srn: srn },
      url: MEMBER_LOGIN,
    });
  };

  const onClickGoToLogin = () => {
    resetOtpView();
  };

  const confirmOtpFnc = async (result) => {
    const authToken = result?.token?.access_token;
    await CookieAndStorageService.set({ key: "auth", value: authToken });
    navigate(navigations.REDIRECT);
  };

  return (
    <>
      {isShowOtpView ? (
        <OtpViewComponent
          headerText={intl.formatMessage({ id: "label.enter_otp" })}
          description={intl.formatMessage({
            id: "label.otp_text_member_login",
          })}
          onClickGoToLogin={onClickGoToLogin}
          sendOtpResult={sendOtpResult}
          verifyOtpParams={{ token: sendOtpResult?.data[0]?.token }}
          otpVerifyEndPoint={MEMBER_VERIFY_OTP}
          confirmOtpFnc={(result) => confirmOtpFnc(result)}
          isMemberLogin={true}
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
            loginDisabledForMembers,
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
