import React, { useState,useEffect } from "react";
import { useIntl } from "react-intl";

import OtpViewUI from "./OtpViewUi";
import useForgotPassword from "../../services/apiServices/hooks/useForgotPassword";
import { useNavigate,useLocation } from "../../routes"; 
import { validateOtp } from "../../constants/CommonFunctions";
import { navigations } from "../../constants/routeNames";
import { OTP_TRY_COUNT ,OTP_TIMER_SECOND,OTP_TIMER_MIN_MINUTES,OTP_TIMER_MAX_MINUTES} from "../../constants/constants";

function OtpViewComponent() {

  const navigate = useNavigate();
  const location = useLocation();
  const intl = useIntl();

  const { email } = location.state || {};

  const [otpLeft,setOtpLeft] = useState(OTP_TRY_COUNT);
  const [isCounter, setIsCounter] = useState(true);
  const [minutes, setMinutes] = useState(OTP_TIMER_MIN_MINUTES);
  const [seconds, setSeconds] = useState(OTP_TIMER_SECOND);

  const [otpValue, setOtpValue] = useState('');
  const [errorMessage, setErrorMessage] = useState("");

  const [successLogin, setSuccessLogin] = useState(false);
  // const { handleForgotPassword } = useForgotPassword(); // for api call hadnling
  const [loginDisabled, setLoginDisabled] = useState(true);


  useEffect(()=>{
    setOtpLeft(prev => prev - 1); 
    // const receivedOtp = '3567'; 
    // setOtpValue(receivedOtp);

  },[])

  useEffect(() => {
    if (otpValue !== "") {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  }, [otpValue]);

  const onClickGoToLogin = () => {
    setSuccessLogin(false);
    navigate(navigations.LOGIN);
  };

  const onClickForgotPassword = () => {
    let error = validateOtp(otpValue);
    if (error) {
      setErrorMessage(error);
      return;
    } else {
      setErrorMessage("");
    }
    // handleForgotPassword({ email: userEmail });
    setSuccessLogin(false);
    navigate(navigations.FORGOT_PASSWORD_OTP);
  };

  const handleOtpChange = (otp) => {
    console.log("Otp recieved ===>",otp);
    // setOtpValue(otp);
  };

  const onResendOtpClick= () => {

    if(otpLeft > 0) {
      console.log("otpLeft current value ===>>> ",otpLeft)
      setOtpLeft(prev => prev - 1);
      setMinutes(OTP_TIMER_MIN_MINUTES);
      setSeconds(OTP_TIMER_SECOND);
      setIsCounter(true);
    }
    else
    {
      console.log("otpLeft current value Zero ===>>  ",otpLeft)
      setOtpLeft(prev => prev - 1);
      setMinutes(OTP_TIMER_MAX_MINUTES);
      setSeconds(0);
    }
    
  };

  return (
    <OtpViewUI
      successLogin={successLogin}
      otpValue={otpValue}
      handleOtpChange={handleOtpChange}
      onClickForgotPassword={onClickForgotPassword}
      onClickGoToLogin={onClickGoToLogin}
      errorMessage={errorMessage}  
      intl={intl}
      loginDisabled={loginDisabled}
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

export default OtpViewComponent;
