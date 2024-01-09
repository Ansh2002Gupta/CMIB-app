import React, { useState, useEffect } from "react";
import { useNavigate } from "../../routes";
import { useIntl } from "react-intl";

import { navigations } from "../../constants/routeNames";
import OtpViewUI from "./OtpViewUI";
import useSendOtpAPI from "../../services/apiServices/hooks/useSendOtpAPI";
import useVerifyOtpAPI from "../../services/apiServices/hooks/useVerifyOtpAPI";
import { validateOtp } from "../../constants/commonFunctions";
import {
  OTP_TRY_COUNT,
  OTP_TIMER_SECOND,
  OTP_TIMER_MIN_MINUTES,
} from "../../constants/constants";

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
  const [validationError, setValidationError] = useState("");

  const { handleSendOtpAPI } = useSendOtpAPI();
  const { handleVerifyOtpAPI, isLoading } = useVerifyOtpAPI();

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
    handleVerifyOtpAPI(
      { email: email, otp: otpValue },
      (result) => {
        navigate(navigations.CREATE_NEW_PASSWORD, {
          state: { token: result.token },
        });
      },
      (error) => {
        setValidationError(error);
      }
    );
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
    setValidationError("");
  };

  return (
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
      validationError={validationError}
    />
  );
}

export default OtpView;
