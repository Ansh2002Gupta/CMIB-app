import { mailformat, otpRegex } from "./Regex";


export const validateEmail = (userEmail) => {
  if (!userEmail.match(mailformat)) {
    return intl.formatMessage({ id: "label.NOT_VALID_EMAIL" });
  } 
    return "";
};

export const validateOtp = (username) => {
  if (!username.match(otpRegex)) {
    return intl.formatMessage({ id: "label.NOT_VALID_OTP" });
  } 
    return "";
};