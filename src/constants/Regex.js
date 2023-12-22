export const mailformat = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
export const otpRegex = /^\d{4}$/;
export const indianPhoneRegex = /^(?:(?:\+?91|0)?[ -]?)?[6-9]\d{9}$/;

export const PASSWORD_VALIDATIONS = {
    length: (password) => password.length >= 6,
    numeric: /[0-9]/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    specialChar: /[!?.@#$%^&+=]/,
  };