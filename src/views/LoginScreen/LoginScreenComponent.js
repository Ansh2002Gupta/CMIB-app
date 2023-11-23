import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import LoginScreenUI from "./LoginScreenUI";
import { useNavigate } from "../../routes";
import { validateEmail } from "../../constants/CommonFunctions";

function LoginScreenComponent(props) {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginDisabled, setLoginDisabled] = useState(true);

  const navigate = useNavigate();
  const icons = useTheme("icons");
  const intl = useIntl();

  const onForgotPasswordClick = async () => {
    navigate("/forgotPassword");
  };

  const toggleUser = (val) => {
    setActive(val);
  };

  const onLogin = () => {
    let error = validateEmail(userName);
    if (error) {
      setErrorMessage(error);
      return;
    } else {
      setErrorMessage("");
    }
  };

  const onChangePassword = (val) => {
    setPassword(val);
    setErrorMessage("");
  };

  const onChangeUsername = (val) => {
    {
      setuserName(val);
      setErrorMessage("");
    }
  };

  useEffect(() => {
    if (userName != "" && password != "") {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  }, [userName, password]);

  return (
    <LoginScreenUI
      onChangePassword={onChangePassword}
      active={active}
      onLogin={onLogin}
      onForgotPasswordClick={onForgotPasswordClick}
      toggleUser={toggleUser}
      loginDisabled={loginDisabled}
      onChangeUsername={onChangeUsername}
      errorMessage={errorMessage}
      password={password}
      userName={userName}
      intl={intl}
      icons={icons}
    />
  );
}

export default LoginScreenComponent;
