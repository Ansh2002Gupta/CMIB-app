import React, { useReducer } from "react";
import * as types from "./types";

const initialState = {
  isUserSuccessfullyLoggedOut: false,
};

const logoutReducer = (state, action) => {
  switch (action.type) {
    case types.SET_LOGOUT_TOAST:
      return {
        ...state,
        isUserSuccessfullyLoggedOut: action.payload,
      };

    default:
      return state;
  }
};

export const LogoutContext = React.createContext([initialState, () => {}]);

const LogoutProvider = ({ children }) => {
  const [logoutState, setLogoutDispatch] = useReducer(
    logoutReducer,
    initialState
  );

  return (
    <LogoutContext.Provider value={[logoutState, setLogoutDispatch]}>
      {children}
    </LogoutContext.Provider>
  );
};

export default LogoutProvider;