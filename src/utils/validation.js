import { numRegex, VALID_EMAIL, VALID_OTP } from "../constants/constants";
import {
  mailformat,
  NEW_PASSWORD_VALIDATIONS,
  otpRegex,
} from "../constants/Regex";

export const isStringContainsNumber = (string) =>
  NEW_PASSWORD_VALIDATIONS.numeric.test(string);
export const isStringContainsUppercase = (string) =>
  NEW_PASSWORD_VALIDATIONS.uppercase.test(string);
export const isStringContainsLowercase = (string) =>
  NEW_PASSWORD_VALIDATIONS.lowercase.test(string);
export const isStringContainsSpecialChar = (string) =>
  NEW_PASSWORD_VALIDATIONS.specialChar.test(string);
export const isStringLengthValid = (string) => string.length >= 6;

export const strongPasswordValidator = (password) => {
  return (
    isStringLengthValid(password) &&
    isStringContainsNumber(password) &&
    isStringContainsUppercase(password) &&
    isStringContainsLowercase(password) &&
    isStringContainsSpecialChar(password)
  );
};

export const numericValidator = (val) => {
  return val === "" || numRegex.test(String(val));
};

export const validateEmail = (userEmail) => {
  if (!userEmail.toLowerCase().match(mailformat)) {
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

export const onConfirmPasswordBlur = ({
  confirmNewPassword,
  newPassword,
  setError,
  errorMessage,
}) => {
  const doPasswordsMatch = newPassword === confirmNewPassword;
  if (!!confirmNewPassword && !!newPassword && !doPasswordsMatch) {
    setError(errorMessage);
  } else {
    setError("");
  }
};

export const handleConfirmPasswordChange = ({
  newPassword,
  setConfirmNewPassword,
  setError,
  val,
}) => {
  const trimmedPassword = val.trim();
  setConfirmNewPassword(trimmedPassword);
  if (!!newPassword && !!val && newPassword === val) {
    setError("");
  }
};

export const handleNewPasswordChange = ({
  confirmNewPassword,
  setNewPassword,
  setError,
  val,
}) => {
  const trimmedPassword = val.trim();
  setNewPassword(trimmedPassword);
  if (!!confirmNewPassword && !!val && confirmNewPassword === val) {
    setError("");
  }
};
