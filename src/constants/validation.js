import { numRegex } from "./constants";
import { NEW_PASSWORD_VALIDATIONS } from "./Regex";

export const isStringContainsNumber = (string) =>
  NEW_PASSWORD_VALIDATIONS.numeric.test(string);
export const isStringContainsUppercase = (string) =>
  NEW_PASSWORD_VALIDATIONS.uppercase.test(string);
export const isStringContainsLowercase = (string) =>
  NEW_PASSWORD_VALIDATIONS.lowercase.test(string);
export const isStringContainsSpecialChar = (string) =>
  NEW_PASSWORD_VALIDATIONS.specialChar.test(string);
export const isStringLengthValid = (string) => string.length >= 8;

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
