import * as types from "./types";

export const setSignUpDetails = (value) => {
  return {
    type: types.SET_SIGN_UP_DETAIL,
    payload: value,
  };
};

export const setModulesList = (value) => {
  return {
    type: types.SET_MODULES_LIST,
    payload: value,
  };
};

export const deleteSignUpDetailKey = (value) => {
  return {
    type: types.DELETE_SIGN_UP_DETAIL_KEY,
    payload: value,
  };
};

export const resetSignUpDetails = () => {
  return {
    type: types.RESET_SIGN_UP_DETAIL,
  };
};
