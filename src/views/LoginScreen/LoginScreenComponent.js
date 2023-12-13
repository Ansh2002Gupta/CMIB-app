import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";
import { useTheme } from "@unthinkable/react-theme";
import { ActivityIndicator } from "@unthinkable/react-core-components";

import LoginScreenUI from "./LoginScreenUI";
import useLoginUser from "../../services/apiServices/hooks/useLoginUser";
import { navigations } from "../../constants/routeNames";
import { validateEmail } from "../../constants/CommonFunctions";

function LoginScreenComponent(props) {
  const navigate = useNavigate();
  const icons = useTheme("icons");
  const intl = useIntl();

  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginDisabled, setLoginDisabled] = useState(true);
  const { handleUserLogin, isLoading, errorWhileLoggingIn } = useLoginUser();

  const [options, setOptions] = useState([
    {
      title: intl.formatMessage({ id: "label.remember_me" }),
      isSelected: false,
      id: 1,
    },
  ]);

  const handleToggle = (id) => {
    const updatedItems = options.map((item) => {
      if (item.id === id) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    setOptions(updatedItems);
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
    // let error = validateEmail(userName);
    // if (error) {
    //   setErrorMessage(error);
    // } else {
    //   setErrorMessage("");
    //   handleUserLogin({ email: userName, password: password });
    // }
    navigate(navigations.LOGIN_FORM);
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
      onCreateNewPasswordClick={onCreateNewPasswordClick}
      handleToggle={handleToggle}
      options={options}
      isLoading={isLoading}
      errorWhileLoggingIn={errorWhileLoggingIn}
    />
  );
}

export default LoginScreenComponent;
