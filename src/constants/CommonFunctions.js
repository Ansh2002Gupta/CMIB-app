import { mailformat,otpRegex } from "./Regex";

export const validateEmail = (userEmail) => {
  if (!userEmail.match(mailformat)) {
    return "Not a valid email, please enter again";
  } else {
    return "";
  }
};

export const validateOtp = (username) => {
  if (!username.match(otpRegex)) {
    return "Not a valid otp, please enter again";
  } else {
    return "";
  }
};