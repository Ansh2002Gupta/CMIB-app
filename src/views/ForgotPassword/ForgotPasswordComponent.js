import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";

import ForgotPasswordUI from "./ForgotPasswordUI";
import OtpViewComponent from "../OtpView";
import useSendOtpAPI from "../../services/apiServices/hooks/useSendOtpAPI";
import { validateEmail } from "../../utils/validation";
import { navigations } from "../../constants/routeNames";

function ForgotPasswordComponent() {
  const navigate = useNavigate();
  const intl = useIntl();

  const [errorMessage, setErrorMessage] = useState("");
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [successLogin, setSuccessLogin] = useState(false);
  const [userEmail, setuserEmail] = useState("");
  const [validationError, setValidationError] = useState("");

  const { handleSendOtpAPI, isLoading, isShowOtpView, setIsShowOtpView } =
    useSendOtpAPI();

  useEffect(() => {
    if (userEmail !== "") {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  }, [userEmail]);

  const onClickGoToLogin = () => {
    setSuccessLogin(false);
    navigate(navigations.LOGIN, { state: { activeTab: true } });
  };

  const onSendOtpClick = () => {
    let error = validateEmail(userEmail);
    if (error) {
      setErrorMessage(error);
      return;
    } else {
      setErrorMessage("");
    }
    handleSendOtpAPI({ email: userEmail }, true, (error) => {
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
      {isShowOtpView ? (
        <OtpViewComponent
          email={userEmail}
          setIsShowOtpView={setIsShowOtpView}
        />
      ) : (
        <ForgotPasswordUI
          successLogin={successLogin}
          userEmail={userEmail}
          onSendOtpClick={onSendOtpClick}
          onClickGoToLogin={onClickGoToLogin}
          onChangeInput={onChangeInput}
          errorMessage={errorMessage}
          intl={intl}
          loginDisabled={loginDisabled}
          isLoading={isLoading}
          handleDismissToast={handleDismissToast}
          validationError={validationError}
        />
      )}
    </>
  );
}
export default ForgotPasswordComponent;
