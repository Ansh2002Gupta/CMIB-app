import * as types from "./types";

export const setSelectedModule = (value) => {
  return {
    type: types.MODULE_LIST,
    payload: value,
  };
};

export const setSelectedSession = (value) => {
  return {
    type: types.SELECTED_SESSION,
    payload: value,
  };
};

export const setGlobalSessionList = (payload) => {
  return {
    type: types.SET_GLOBAL_SESSION_LIST,
    payload,
  };
};

export const setRoundsData = (payload) => {
  return {
    type: types.SET_ROUNDS_DATA,
    payload,
  };
};
