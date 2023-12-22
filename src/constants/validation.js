export const isStringContainsNumber = (string) => /\d/.test(string);
export const isStringContainsUppercase = (string) => /[A-Z]/.test(string);
export const isStringContainsLowercase = (string) => /[a-z]/.test(string);
export const isStringContainsSpecialChar = (string) => /[^A-Za-z0-9]/.test(string);
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