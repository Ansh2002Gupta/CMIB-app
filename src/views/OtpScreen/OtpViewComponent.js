import React, { useState,useEffect } from "react";
import { useIntl } from "react-intl";

import OtpViewUI from "./OtpViewUi";
import useForgotPassword from "../../services/apiServices/hooks/useForgotPassword";
import { useNavigate } from "../../routes";
import { validateOtp } from "../../constants/CommonFunctions";
import { navigations } from "../../constants/routeNames";

function OtpViewComponent() {

  const navigate = useNavigate();
  const intl = useIntl();

  // the timer 
  const [otpLeft,setOtpLeft] = useState(3);
  const [isCounter, setIsCounter] = useState(true);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);

  //handling the otp
  const [otpValue, setOtpValue] = useState('');
  // const [userEmail, setuserEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [successLogin, setSuccessLogin] = useState(false);
  // const { handleForgotPassword } = useForgotPassword(); // for api call hadnling

  //for disable button
  const [loginDisabled, setLoginDisabled] = useState(true);

  useEffect(() => {
    if (otpValue !== "") {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  }, [otpValue]);

  const onClickGoToLogin = () => {
    // setSuccessLogin(false);
    // navigate(navigations.LOGIN);
  };

  const onClickForgotPassword = () => {

    console.log("value of otpValue ===> ",otpValue)

    let error = validateOtp(otpValue);
    if (error) {
      setErrorMessage(error);
      return;
    } else {
      setErrorMessage("");
    }
    // handleForgotPassword({ email: userEmail });
    // setSuccessLogin(true);
  };

  // const onChangeInput = (val) => {
  //   setuserEmail(val);
  // };

  const handleOtpChange = (otp) => {
    setOtpValue(otp);
  };


  //send otp call
  const onResendOtpClick= () => {
    setIsCounter(true);
    if(otpLeft > 0) {
      setOtpLeft(prev => prev - 1);
      setSeconds(5);
      }else{
        setMinutes(15);
        setSeconds(0);
      }

  };

  return (
    <OtpViewUI
      successLogin={successLogin}
      // userEmail={userEmail}
       // onChangeInput={onChangeInput}
      otpValue={otpValue}
      handleOtpChange={handleOtpChange}
      onClickForgotPassword={onClickForgotPassword}
      onClickGoToLogin={onClickGoToLogin}
      errorMessage={errorMessage}  // handle error
      intl={intl}
      loginDisabled={loginDisabled}
      onResendOtpClick={onResendOtpClick}
      otpLeft={otpLeft}
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
