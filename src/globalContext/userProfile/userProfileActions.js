import * as types from "./types";

export const setIsGettingUserDetails = (payload) => {
  return {
    type: types.SET_IS_GETTING_USER_DETAILS,
    payload,
  };
};

export const setErrorGetingUserDetails = (payload) => {
  return {
    type: types.SET_ERROR_GETTING_USER_DETAILS,
    payload,
  };
};

export const setUserDetails = (payload) => {
  return {
    type: types.SET_USER_DETAILS,
    payload,
  };
};

export const resetUserDetails = () => {
  return {
    type: types.RESET_USER_DETAILS,
  };
};

export const setShowChangePasswordModal = (payload) => {
  return {
    type: types.SET_SHOW_CHANGE_PASSWORD_MODAL,
    payload,
  };
};

export const setShowLogoutModal = (payload) => {
  return {
    type: types.SET_SHOW_LOGOUT_MODAL,
    payload,
  };
};

export const setShowViewProfileDetails = (payload) => {
  return {
    type: types.SET_SHOW_VIEW_PROFILE_DETAILS,
    payload,
  };
};
