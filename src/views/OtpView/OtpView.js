import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "../../routes";
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

function OtpView({
  email,
  setSendOtpResult,
  token,
  headerText,
  description,
  onClickGoToLogin,
  sendOtpResult,
  verifyOtpParams,
  otpVerifyEndPoint,
  confirmOtpFnc,
}) {
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
  const {
    errorWhileResetPassword,
    handleVerifyOtpAPI,
    isLoading,
    isSuccess,
    setErrorWhileResetPassword,
    verifyOtpResult,
  } = useVerifyOtpAPI();

  useEffect(() => {
    if (otpValue !== "" && otpValue?.length === 4) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [otpValue]);

  const onVerifyOtpClick = () => {
    let error = validateOtp(otpValue);
    if (error) {
      setErrorMessage(error);
      return;
    } else {
      setErrorMessage("");
    }
    handleVerifyOtpAPI(
      { ...verifyOtpParams, otp: otpValue },
      otpVerifyEndPoint,
      (result) => confirmOtpFnc(result),
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
      handleSendOtpAPI({ email });
    }
  };

  const handleDismissToast = () => {
    setErrorWhileResetPassword("");
  };

  return (
    <>
      {isSuccess ? (
        <CreateNewPasswordComponent resetToken={verifyOtpResult?.data?.token} />
      ) : (
        <OtpViewUI
          {...{
            description,
            email,
            errorMessage,
            handleDismissToast,
            handleOtpChange,
            headerText,
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
            setSendOtpResult,
            setMinutes,
            sendOtpResult,
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
