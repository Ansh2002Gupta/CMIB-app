import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";

import ForgotPasswordUI from "./ForgotPasswordUI";
import OtpView from "../OtpView";
import useSendOtpAPI from "../../services/apiServices/hooks/useSendOtpAPI";
import { COMPANY_VERIFY_OTP } from "../../services/apiServices/apiEndPoint";
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

  const { handleSendOtpAPI, isLoading, sendOtpResult, setSendOtpResult } =
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
    handleSendOtpAPI({
      payload: { email: userEmail },
      errorCallback: (error) => {
        setValidationError(error);
      },
    });
    setSuccessLogin(false);
  };

  const onChangeInput = (val) => {
    setuserEmail(val);
  };

  const handleDismissToast = () => {
    setValidationError("");
  };

  const handleBlur = () => {
    let error = validateEmail(userEmail);
    if (!error) {
      setErrorMessage("");
    } else {
      setErrorMessage(error);
    }
  };

  return (
    <>
      {!!sendOtpResult && !!Object.keys(sendOtpResult)?.length ? (
        <OtpView
          email={userEmail}
          setSendOtpResult={setSendOtpResult}
          headerText={intl.formatMessage({ id: "label.forgot_password" })}
          description={intl.formatMessage({
            id: "label.otp_text_forgot_password",
          })}
          onClickGoToLogin={onClickGoToLogin}
          verifyOtpParams={{ token: sendOtpResult?.data?.token }}
          otpVerifyEndPoint={COMPANY_VERIFY_OTP}
        />
      ) : (
        <ForgotPasswordUI
          handleBlur={handleBlur}
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
