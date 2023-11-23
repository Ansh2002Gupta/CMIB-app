import { mailformat } from "./Regex";

export const validateEmail = (username) => {
  if (!username.match(mailformat)) {
    return "Not a valid email, please enter again";
  } else {
    return "";
  }
};
