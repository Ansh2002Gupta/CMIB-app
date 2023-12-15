import React, { useState,useEffect } from "react";
import { useNavigate } from "../../routes"; 
import { useIntl } from "react-intl";


import { navigations } from "../../constants/routeNames";
import OtpViewUI from "./OtpViewUI";
import useForgotPasswordAPI from "../../services/apiServices/hooks/useForgotPasswordAPI";
import { validateOtp } from "../../constants/commonFunctions";
import { OTP_TRY_COUNT ,OTP_TIMER_SECOND,OTP_TIMER_MIN_MINUTES} from "../../constants/constants";

function OtpView( {email}) {
  const navigate = useNavigate();
  const intl = useIntl();

  const [errorMessage, setErrorMessage] = useState("");
  const [isCounter, setIsCounter] = useState(true);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [minutes, setMinutes] = useState(OTP_TIMER_MIN_MINUTES);
  const [otpLeft,setOtpLeft] = useState(OTP_TRY_COUNT);
  const [otpValue, setOtpValue] = useState('');
  const [seconds, setSeconds] = useState(OTP_TIMER_SECOND);
  
  const { handleForgotPasswordAPI } = useForgotPasswordAPI(); 

  useEffect(() => {
    if (otpValue !== "") {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [otpValue]);

  const onClickGoToLogin = () => {
    navigate(navigations.LOGIN);
  };

  const onClickSubmit = () => {
    let error = validateOtp(otpValue);
    if (error) {
      setErrorMessage(error);
      return;
    } else {
      setErrorMessage("");
    }
    navigate(navigations.CREATE_NEW_PASSWORD,{ state: { email,otpCode: otpValue } });
  };

  const handleOtpChange = (otp) => {
    setOtpValue(otp);
  };

  const onResendOtpClick= () => {
    if(otpLeft > 0) {
      setMinutes(OTP_TIMER_MIN_MINUTES);
      setSeconds(OTP_TIMER_SECOND);
      setIsCounter(true);
      handleForgotPasswordAPI({ email }, false);
    }
  };

  return (
    <OtpViewUI
      otpValue={otpValue}
      handleOtpChange={handleOtpChange}
      onClickForgotPassword={onClickSubmit}
      onClickGoToLogin={onClickGoToLogin}
      errorMessage={errorMessage}  
      intl={intl}
      submitDisabled={submitDisabled}
      onResendOtpClick={onResendOtpClick}
      otpLeft={otpLeft}
      setOtpLeft={setOtpLeft}
      isCounter={isCounter}
      setIsCounter={setIsCounter}
      minutes={minutes}
      setMinutes={setMinutes}
      seconds={seconds}
      setSeconds={setSeconds}
    />
  );
}

export default OtpView;
