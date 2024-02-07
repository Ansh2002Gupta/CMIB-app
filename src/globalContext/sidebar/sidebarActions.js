import * as types from "./types";

export const setSelectedModule = (value) => {
  return {
    type: types.MODULE_LIST,
    payload: value,
  };
};

export const setSelectedSession = (value) => {
  return {
    type: types.SESSION_LIST,
    payload: value,
  };
};
