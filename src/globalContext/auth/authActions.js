import * as types from "./types";

export const setAuth = (values) => {
  return {
    type: types.SET_AUTH,
    payload: { ...values },
  };
};

export const clearAuthAndLogout = () => {
  return {
    type: types.CLEAR_AUTH,
  };
};
