import React, { createContext, useReducer } from "react";
import * as types from "./types";

const initialState = {
  selectedModule: {},
  selectedSession: {},
  globalSessionList: [],
  roundsData: {},
};

const sideBarReducer = (state, action) => {
  switch (action.type) {
    case types.MODULE_LIST:
      return {
        ...state,
        selectedModule: { ...action.payload },
      };
    case types.SELECTED_SESSION:
      return {
        ...state,
        selectedSession: { ...action.payload },
      };
    case types.SET_GLOBAL_SESSION_LIST:
      return {
        ...state,
        globalSessionList: action.payload,
      };
    case types.SET_ROUNDS_DATA:
      return {
        ...state,
        roundsData: { ...action.payload },
      };
    default:
      return state;
  }
};

export const SideBarContext = createContext([initialState, () => {}]);

const SideBarProvider = ({ children }) => {
  const [sideBarState, sideBarDispatch] = useReducer(
    sideBarReducer,
    initialState
  );

  return (
    <SideBarContext.Provider value={[sideBarState, sideBarDispatch]}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarProvider;
