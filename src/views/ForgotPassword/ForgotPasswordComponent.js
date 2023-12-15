import React, { useState,useEffect } from "react";
import { useNavigate } from "../../routes";
import { useIntl } from "react-intl";


import ForgotPasswordUI from "./ForgotPasswordUI";
import OtpViewComponent from "../OtpView";
import useForgotPasswordAPI from "../../services/apiServices/hooks/useForgotPasswordAPI";
import { validateEmail } from "../../constants/CommonFunctions";
import { navigations } from "../../constants/routeNames";

function ForgotPasswordComponent() {

  const navigate = useNavigate();
  const intl = useIntl();

  const [errorMessage, setErrorMessage] = useState("");
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [successLogin, setSuccessLogin] = useState(false); 
  const [userEmail, setuserEmail] = useState("");
  const [validationError, setValidationError] = useState("");
  
  const { handleForgotPasswordAPI, isLoading,isShowOtpView} = useForgotPasswordAPI();

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
    handleForgotPasswordAPI(
      { email: userEmail },
       true,  
    (error) => {
      setValidationError(error);
    }); 
    setSuccessLogin(false);   
  };

  const onChangeInput = (val) => {
    setuserEmail(val);
  };

  const handleDismissToast = () => {
    setValidationError("");
  };

  return (
    <>
    {isShowOtpView ? 
    <OtpViewComponent
    email={userEmail}
    /> :
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
      handleDismissToast={handleDismissToast}
      validationError={validationError}
    />}
    </>
  );
}
export default ForgotPasswordComponent;