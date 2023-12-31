export const mailformat = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
export const otpRegex = /^\d{4}$/;
export const indianPhoneRegex = /^(?:(?:\+?91|0)?[ -]?)?[6-9]\d{9}$/;
export const IMAGE_ACCEPTABLE_FORMAT_REGEX = /image\/(png|jpg|jpeg)/i;
export const NEW_PASSWORD_VALIDATIONS = {
  numeric: /\d/,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  specialChar: /[^A-Za-z0-9]/,
};
