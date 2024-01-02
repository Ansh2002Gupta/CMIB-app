import * as types from "./types";

export const setSelectedModule = (value) => {
  return {
    type: types.MODULE_LIST,
    payload: value,
  };
};
