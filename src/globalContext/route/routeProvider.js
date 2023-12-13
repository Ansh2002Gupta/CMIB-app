import React, { createContext, useReducer } from "react";
import * as types from "./types";

const routeReducer = (state, action) => {
  switch (action.type) {
    case types.LOGIN_REDIRECT_ROUTE:
      return {
        ...state,
        ...action.payload,
      };
    case types.RESET_REDIRECT_ROUTE:
      return {};
    default:
      return state;
  }
};

const initialState = {};

export const RouteContext = createContext([initialState, () => {}]);

const RouteProvider = ({ children }) => {
  const [routeState, routeDispatch] = useReducer(routeReducer, initialState);

  return (
    <RouteContext.Provider value={[routeState, routeDispatch]}>
      {children}
    </RouteContext.Provider>
  );
};

export default RouteProvider;
