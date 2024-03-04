import React, { createContext, useReducer } from "react";
import * as types from "./types";

const initialState = {
  signUpDetail: {
    contact_details: [
      {
        countryCode: "",
        designation: "",
        emailId: "",
        mobileNo: "",
        modules: [],
        name: "",
        salutation: "",
      },
    ],
  },
};

const localeReducer = (state, action) => {
  switch (action.type) {
    case types.SET_SIGN_UP_DETAIL:
      return {
        ...state,
        signUpDetail: { ...state.signUpDetail, ...action.payload },
      };
    case types.DELETE_SIGN_UP_DETAIL_KEY:
      const newSignUpDetail = { ...state.signUpDetail };
      delete newSignUpDetail[action.payload];
      return {
        ...state,
        signUpDetail: newSignUpDetail,
      };
    case types.RESET_SIGN_UP_DETAIL:
      return initialState;
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
