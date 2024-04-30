import {
  alphaNumericRegex,
  FORM_STATES,
  numRegex,
  VALID_EMAIL,
  VALID_GSTIN,
  VALID_OTP,
  VALID_PAN,
  VALID_TAN,
} from "../constants/constants";
import {
  gstNumberRegex,
  mailformat,
  NEW_PASSWORD_VALIDATIONS,
  otpRegex,
  panNumberRegex,
  tanNumberRegex,
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

export const alphaNumericValidator = (val) => {
  return val === "" || alphaNumericRegex.test(String(val));
};

export const validateEmail = (userEmail) => {
  if (!userEmail.toLowerCase().match(mailformat)) {
    return VALID_EMAIL;
  }
  return "";
};

export const validatePAN = (pan) => {
  if (!pan.match(panNumberRegex)) {
    return VALID_PAN;
  }
  return "";
};

export const validateGSTIN = (gstNumber) => {
  if (!gstNumber.match(gstNumberRegex)) {
    return VALID_GSTIN;
  }
  return "";
};

export const validateTAN = (tanNumber) => {
  if (!tanNumber.match(tanNumberRegex)) {
    return VALID_TAN;
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

export const getValidMode = (mode) => {
  if (
    mode?.toLowerCase() === FORM_STATES.EDITABLE ||
    mode?.toLowerCase() === FORM_STATES.VIEW_ONLY
  ) {
    return true;
  }
  return false;
};
