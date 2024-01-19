import React, { useEffect, useState } from "react";
import { useNavigate } from "../../routes";
import { useIntl } from "react-intl";

import CreateNewPasswordComponent from "../CreateNewPassword";
import OtpViewUI from "./OtpViewUI";
import useVerifyOtpAPI from "../../services/apiServices/hooks/useVerifyOtpAPI";
import useSendOtpAPI from "../../services/apiServices/hooks/useSendOtpAPI";
import { navigations } from "../../constants/routeNames";
import {
  OTP_TIMER_SECOND,
  OTP_TIMER_MIN_MINUTES,
  OTP_TRY_COUNT,
} from "../../constants/constants";
import { validateOtp } from "../../constants/commonFunctions";

function OtpView({ email }) {
  const navigate = useNavigate();
  const intl = useIntl();

  const [errorMessage, setErrorMessage] = useState("");
  const [isCounter, setIsCounter] = useState(true);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [minutes, setMinutes] = useState(OTP_TIMER_MIN_MINUTES);
  const [otpLeft, setOtpLeft] = useState(OTP_TRY_COUNT);
  const [otpValue, setOtpValue] = useState("");
  const [seconds, setSeconds] = useState(OTP_TIMER_SECOND);

  const { handleSendOtpAPI } = useSendOtpAPI();
  const {
    handleVerifyOtpAPI,
    isLoading,
    isSuccess,
    errorWhileResetPassword,
    setErrorWhileResetPassword,
  } = useVerifyOtpAPI();

  useEffect(() => {
    if (otpValue !== "" && otpValue?.length === 4) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [otpValue]);

  const onClickGoToLogin = () => {
    navigate(navigations.LOGIN);
  };

  const onVerifyOtpClick = () => {
    let error = validateOtp(otpValue);
    if (error) {
      setErrorMessage(error);
      return;
    } else {
      setErrorMessage("");
    }
    handleVerifyOtpAPI({ email: email, otp: otpValue });
  };

  const handleOtpChange = (otp) => {
    setOtpValue(otp);
  };

  const onResendOtpClick = () => {
    if (otpLeft > 0) {
      setMinutes(OTP_TIMER_MIN_MINUTES);
      setSeconds(OTP_TIMER_SECOND);
      setIsCounter(true);
      handleSendOtpAPI({ email }, false);
    }
  };

  const handleDismissToast = () => {
    setErrorWhileResetPassword("");
  };

  return (
    <>
      {isSuccess ? (
        <CreateNewPasswordComponent />
      ) : (
        <OtpViewUI
          otpValue={otpValue}
          handleOtpChange={handleOtpChange}
          onVerifyOtpClick={onVerifyOtpClick}
          onClickGoToLogin={onClickGoToLogin}
          errorMessage={errorMessage}
          intl={intl}
          submitDisabled={submitDisabled}
          onResendOtpClick={onResendOtpClick}
          otpLeft={otpLeft}
          setOtpLeft={setOtpLeft}
          isLoading={isLoading}
          isCounter={isCounter}
          setIsCounter={setIsCounter}
          minutes={minutes}
          setMinutes={setMinutes}
          seconds={seconds}
          setSeconds={setSeconds}
          handleDismissToast={handleDismissToast}
          validationError={errorWhileResetPassword}
        />
      )}
    </>
  );
}

export default OtpView;
