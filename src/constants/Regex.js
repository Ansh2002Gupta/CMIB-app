export const mailformat = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
export const otpRegex = /^\d{4}$/;
export const indianPhoneRegex = /^(?:(?:\+?91|0)?[ -]?)?[6-9]\d{9}$/;
export const IMAGE_ACCEPTABLE_FORMAT_REGEX = /image\/(png|jpg|jpeg|svg)/i;
export const DOCUMENT_ACCEPTABLE_FORMAT_REGEX = /application\/(pdf)/i;
export const VIDEO_ACCEPTABLE_FORMAT_REGEX = /video\/(mp4)/i;
export const NEW_PASSWORD_VALIDATIONS = {
  numeric: /\d/,
  uppercase: /(?=.*?[A-Z])/,
  lowercase: /(?=.*?[a-z])/,
  specialChar: /(?=.*?[#?!@$%^&*-])/,
};
