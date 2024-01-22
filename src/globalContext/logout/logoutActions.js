import * as types from "./types";

export const setLogoutToast = (payload) => {
  console.log("actions", payload);
  return {
    type: types.SET_LOGOUT_TOAST,
    payload,
  };
};
