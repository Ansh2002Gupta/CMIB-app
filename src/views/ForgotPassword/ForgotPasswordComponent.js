import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";
import { validateEmail } from "../../constants/CommonFunctions";
import ForgotPasswordUI from "./ForgotPasswordUI";
import useForgotPassword from "../../services/apiServices/hooks/useForgotPassword";

function ForgotPasswordComponent(props) {
  const navigate = useNavigate();
  const intl = useIntl();
  const [userName, setuserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successLogin, setSuccessLogin] = useState(false);
  const {
    forgotPasswordResult,
    handleForgotPassword,
    isLoading,
    errorWhileResetPassword,
  } = useForgotPassword();

  const onClickGoToLogin = () => {
    setSuccessLogin(false);
    navigate("/");
  };

  const onClickForgotPassword = () => {
    let error = validateEmail(userName);
    if (error) {
      setErrorMessage(error);
      return;
    } else {
      setErrorMessage("");
    }
    handleForgotPassword({ email: userName });
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
    />
  );
}

export default ForgotPasswordComponent;
