import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import LoginScreenUI from "./LoginScreenUI";
import { useNavigate } from "../../routes";
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
    navigate("/forgotPassword");
  };

  const onCreateNewPasswordClick = async () => {
    navigate("/signup");
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
      onCreateNewPasswordClick={onCreateNewPasswordClick}
      handleToggle={handleToggle}
      options={options}
    />
  );
}

export default LoginScreenComponent;
