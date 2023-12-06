import React, { createContext, useReducer } from "react";
import * as types from "./types";

const initialState = { signUpDetail: {} };

const localeReducer = (state, action) => {
  switch (action.type) {
    case types.SET_SIGN_UP_DETAIL:
      return {
        ...state,
        signUpDetail: { ...state.signUpDetail, ...action.payload },
      };
    default:
      return state;
  }
};

export const SignUpContext = createContext([initialState, () => {}]);

const SignUpProvider = ({ children }) => {
  const [signUpState, signUpDispatch] = useReducer(localeReducer, initialState);

  return (
    <SignUpContext.Provider value={[signUpState, signUpDispatch]}>
      {children}
    </SignUpContext.Provider>
  );
};

export default SignUpProvider;
