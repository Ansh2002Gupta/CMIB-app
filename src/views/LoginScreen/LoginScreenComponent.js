import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";
import { useTheme } from "@unthinkable/react-theme";

import LoginScreenUI from "./LoginScreenUI";
import useLoginUser from "../../services/apiServices/hooks/useLoginUser";
import { navigations } from "../../constants/routeNames";
import { validateEmail } from "../../constants/commonFunctions";

function LoginScreenComponent() {
  const navigate = useNavigate();
  const icons = useTheme("icons");
  const intl = useIntl();

  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginDisabled, setLoginDisabled] = useState(true);
  const {
    handleUserLogin,
    isLoading,
    errorWhileLoggingIn,
    setErrorWhileLoggingIn,
  } = useLoginUser();

  const handleDismissToast = () => {
    setErrorWhileLoggingIn("");
  };

  const onForgotPasswordClick = async () => {
    navigate(navigations.FORGOT_PASSWORD);
  };

  const onSignUpClick = async () => {
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
      onSignUpClick={onSignUpClick}
      onForgotPasswordClick={onForgotPasswordClick}
      onLogin={onLogin}
      password={password}
      toggleUser={toggleUser}
      userName={userName}
    />
  );
}

export default LoginScreenComponent;
