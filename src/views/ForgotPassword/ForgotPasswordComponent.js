import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import { useNavigate } from "../../routes";
import { validateEmail } from "../../constants/CommonFunctions";
import ForgotPasswordUI from "./ForgotPasswordUI";

function ForgotPasswordComponent(props) {
  const navigate = useNavigate();
  const icons = useTheme("icons");
  const intl = useIntl();
  const [userName, setuserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successLogin, setSuccessLogin] = useState(false);

  const onClickGoToLogin = () => {
    setSuccessLogin(false);
    navigate("/loginScreen");
  };

  const onClickForgotPassword = () => {
    let error = validateEmail(userName);
    if (error) {
      setErrorMessage(error);
      return;
    } else {
      setErrorMessage("");
    }
    setSuccessLogin(true);
  };

  const onChangeInput = (val) => {
    setuserName(val);
  };
  return (
    <ForgotPasswordUI
      successLogin={successLogin}
      userName={userName}
      onClickForgotPassword={onClickForgotPassword}
      onClickGoToLogin={onClickGoToLogin}
      onChangeInput={onChangeInput}
      errorMessage={errorMessage}
      intl={intl}
      icons={icons}
    />
  );
}

export default ForgotPasswordComponent;
