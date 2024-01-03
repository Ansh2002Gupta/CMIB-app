import React, { createContext, useReducer } from "react";
import * as types from "./types";

import { modules } from "../../constants/sideBarHelpers";

const initialState = { selectedModule: modules[0] };

const sideBarReducer = (state, action) => {
  switch (action.type) {    
    case types.MODULE_LIST:       
      return {
        ...state,
        selectedModule: { ...action.payload },
      };
    default:
      return state;
  }
};

export const SideBarContext = createContext([initialState, () => {}]);

const SideBarProvider = ({ children }) => {
  const [sideBarState, sideBarDispatch] = useReducer(sideBarReducer, initialState);

  return (
    <SideBarContext.Provider value={[sideBarState, sideBarDispatch]}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarProvider;
