import * as types from "./types";

export const setSignUpDetails = (value) => {
  return {
    type: types.SET_SIGN_UP_DETAIL,
    payload: value,
  };
};

export const resetSignUpDetails = () => {
  return {
    type: types.RESET_SIGN_UP_DETAIL,
  };
};
