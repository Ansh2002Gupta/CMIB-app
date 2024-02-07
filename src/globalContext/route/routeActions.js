import * as types from "./types";

export const setLoginRedirectRoute = (payload) => {
  return {
    type: types.LOGIN_REDIRECT_ROUTE,
    payload,
  };
};

export const resetLoginRedirectRoute = () => {
  return {
    type: types.RESET_REDIRECT_ROUTE,
  };
};
