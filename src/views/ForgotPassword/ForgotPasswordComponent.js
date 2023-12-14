import React, { useState,useEffect } from "react";
import { useIntl } from "react-intl";

import ForgotPasswordUI from "./ForgotPasswordUI";
import useForgotPasswordAPI from "../../services/apiServices/hooks/useForgotPasswordAPI";
import { useNavigate } from "../../routes";
import { validateEmail } from "../../constants/CommonFunctions";
import { navigations } from "../../constants/routeNames";

function ForgotPasswordComponent() {

  const navigate = useNavigate();
  const intl = useIntl();
  const [userEmail, setuserEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successLogin, setSuccessLogin] = useState(false); 
  const { handleForgotPasswordAPI, isLoading} = useForgotPasswordAPI();

  //for disable button
  const [loginDisabled, setLoginDisabled] = useState(true);

  useEffect(() => {
    if (userEmail !== "") {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  }, [userEmail]);

  const onClickGoToLogin = () => {
    setSuccessLogin(false);
    navigate(navigations.LOGIN);
  };

  const onClickForgotPassword = () => {

    let error = validateEmail(userEmail);
    if (error) {
      setErrorMessage(error);
      return;
    } else {
      setErrorMessage("");
    }
    
    handleForgotPasswordAPI({ email: userEmail }, true); 

    setSuccessLogin(false);   
  };

  


  const onChangeInput = (val) => {
    setuserEmail(val);
  };

  return (
    <ForgotPasswordUI
      successLogin={successLogin}
      userEmail={userEmail}
      onClickForgotPassword={onClickForgotPassword}
      onClickGoToLogin={onClickGoToLogin}
      onChangeInput={onChangeInput}
      errorMessage={errorMessage}
      intl={intl}
      loginDisabled={loginDisabled}
      isLoading={isLoading}
    />
  );
}

export default ForgotPasswordComponent;
