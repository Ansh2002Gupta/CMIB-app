import React, { createContext, useReducer } from "react";
import * as types from "./types";

const initialState = { ticketScreenList: [] };

const localeReducer = (state, action) => {
    switch (action.type) {
      case types.TICKET_SCREEN_LIST_DATA:
        return {
          ...state,
          ticketScreenList: [...action.payload],
        };
      default:
        return state;
    }
  };

export const TicketScreenContext = createContext([initialState, () => {}]);

const TicketScreenProvider = ({ children }) => {
  const [ticketScreenState, ticketScreenDispatch] = useReducer(localeReducer, initialState);

  return (
    <TicketScreenContext.Provider value={[ticketScreenState, ticketScreenDispatch]}>
      {children}
    </TicketScreenContext.Provider>
  );
};

export default TicketScreenProvider;
