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
import { validateOtp } from "../../utils/validation";

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
    errorWhileResetPassword,
    handleVerifyOtpAPI,
    isLoading,
    isSuccess,
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
    handleVerifyOtpAPI({ payload: { email, otp: otpValue } });
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
          {...{
            errorMessage,
            handleDismissToast,
            handleOtpChange,
            intl,
            isCounter,
            isLoading,
            minutes,
            onClickGoToLogin,
            onResendOtpClick,
            onVerifyOtpClick,
            otpLeft,
            otpValue,
            seconds,
            setIsCounter,
            setMinutes,
            setOtpLeft,
            setSeconds,
            submitDisabled,
            validationError: errorWhileResetPassword,
          }}
        />
      )}
    </>
  );
}

export default OtpView;
