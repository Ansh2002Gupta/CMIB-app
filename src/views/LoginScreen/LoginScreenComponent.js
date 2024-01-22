import React, { useState, useEffect, useContext } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "../../routes";
import { useTheme } from "@unthinkable/react-theme";

import LoginScreenUI from "./LoginScreenUI";
import useLoginUser from "../../services/apiServices/hooks/useLoginUser";
import { navigations } from "../../constants/routeNames";
import { validateEmail } from "../../utils/validation";
import { LogoutContext } from "../../globalContext/logout/logoutProvider";
import { setLogoutToast } from "../../globalContext/logout/logoutActions";

function LoginScreenComponent() {
  const [logoutState, setLogoutDispatch] = useContext(LogoutContext);
  const { isLogoutToast } = logoutState;
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location?.state?.activeTab;
  const icons = useTheme("icons");
  const intl = useIntl();

  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(activeTab ? activeTab : false);
  const [errorMessage, setErrorMessage] = useState("");
  const [logoutToastMessage, setLogoutToastMessage] = useState(
    intl.formatMessage({ id: "label.logout_successfully" })
  );
  const [loginDisabled, setLoginDisabled] = useState(true);
  const {
    handleUserLogin,
    isLoading,
    errorWhileLoggingIn,
    setErrorWhileLoggingIn,
  } = useLoginUser();

  const handleDismissToast = () => {
    setErrorWhileLoggingIn("");
    setLogoutToastMessage("");
    setLogoutDispatch(setLogoutToast(false));
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

  useEffect(() => {
    if (userName !== "" && password !== "") {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  }, [userName, password]);

  return (
    <LoginScreenUI
      active={active}
      errorMessage={errorMessage}
      errorWhileLoggingIn={errorWhileLoggingIn}
      handleDismissToast={handleDismissToast}
      loginDisabled={loginDisabled}
      icons={icons}
      intl={intl}
      isLoading={isLoading}
      onChangePassword={onChangePassword}
      onChangeUsername={onChangeUsername}
      onCreateNewPasswordClick={onCreateNewPasswordClick}
      onForgotPasswordClick={onForgotPasswordClick}
      onLogin={onLogin}
      password={password}
      logoutState={isLogoutToast}
      logoutToastMessage={logoutToastMessage}
      toggleUser={toggleUser}
      userName={userName}
    />
  );
}

export default LoginScreenComponent;
