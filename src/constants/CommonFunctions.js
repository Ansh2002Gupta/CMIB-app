import { useIntl } from "react-intl";
import { mailformat, otpRegex } from "./Regex";

const intl = useIntl();

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