import * as types from "./types";

export const setModuleList = (value) => {
  return {
    type: types.MODULE_LIST,
    payload: value,
  };
};
