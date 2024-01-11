import * as types from "./types";

export const setTicketScreenList = (value) => {
  return {
    type: types.TICKET_SCREEN_LIST_DATA,
    payload: value,
  };
};

