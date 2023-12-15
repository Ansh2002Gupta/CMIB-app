import { mailformat, otpRegex } from "./Regex";
import {VALID_EMAIL ,VALID_OTP  } from "./constants";


export const validateEmail = (userEmail) => {
  if (!userEmail.match(mailformat)) {
    return VALID_EMAIL;
  } 
    return "";
};

export const validateOtp = (username) => {
  if (!username.match(otpRegex)) {
    return VALID_OTP;
  } 
    return "";
};