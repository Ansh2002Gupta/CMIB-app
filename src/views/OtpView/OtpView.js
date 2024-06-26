import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import CreateNewPasswordComponent from "../CreateNewPassword";
import OtpViewUI from "./OtpViewUI";
import useVerifyOtpAPI from "../../services/apiServices/hooks/useVerifyOtpAPI";
import useSendOtpAPI from "../../services/apiServices/hooks/useSendOtpAPI";
import {
  OTP_TIMER_SECOND,
  OTP_TIMER_MIN_MINUTES,
  OTP_TRY_COUNT,
} from "../../constants/constants";
import { validateOtp } from "../../utils/validation";

function OtpView({
  confirmOtpHanlder,
  description,
  email,
  headerText,
  isMemberLogin,
  onClickGoToLogin,
  otpVerifyEndPoint,
  sendOtpResult,
  setSendOtpResult,
  verifyOtpParams,
  onLoginForMembers,
}) {
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
      handleVerifyOtpAPI({
        payload: { ...verifyOtpParams, otp: otpValue },
        endPoint: otpVerifyEndPoint,
        successCallback: (result) => {
          confirmOtpHanlder && confirmOtpHanlder(result);
        },
      });
    }
  };

  const handleOtpChange = (otp) => {
    setOtpValue(otp);
  };

  const onResendOtpClick = () => {
    if (otpLeft > 0) {
      setMinutes(OTP_TIMER_MIN_MINUTES);
      setSeconds(OTP_TIMER_SECOND);
      setIsCounter(true);
      onLoginForMembers(); //call login api again
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
            isMemberLogin,
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
