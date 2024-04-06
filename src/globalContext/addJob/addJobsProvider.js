import React, { createContext, useReducer } from "react";
import * as types from "./types";

const initialState = {
  countryData: null,
  functionalData: null,
  jobLocationData: null,
  genderPreferenceData: null,
  workModeData: null,
  jobCategory: null,
  jobType: null,
};

const localeReducer = (state, action) => {
  switch (action.type) {
    case types.ADD_COUNTRY_DATA:
      return {
        ...state,
        countryData: action.payload,
      };
    case types.ADD_FUNCTIONAL_DATA:
      return {
        ...state,
        functionalData: action.payload,
      };
    case types.ADD_GENDER_PREFERENCE:
      return {
        ...state,
        genderPreferenceData: action.payload,
      };
    case types.ADD_JOB_CATEGORY:
      return {
        ...state,
        jobCategory: action.payload,
      };
    case types.ADD_JOB_LOCATION:
      return {
        ...state,
        jobLocationData: action.payload,
      };
    case types.ADD_JOB_TYPE:
      return {
        ...state,
        jobType: action.payload,
      };
    case types.ADD_WORK_MODE:
      return {
        ...state,
        workModeData: action.payload,
      };

    case types.RESET_JOB_DATA:
      return initialState;
    default:
      return state;
  }
};

export const AddJobContext = createContext([initialState, () => {}]);

const AddJobProvider = ({ children }) => {
  const [addJobs, addJobsDispatch] = useReducer(localeReducer, initialState);

  return (
    <AddJobContext.Provider value={[addJobs, addJobsDispatch]}>
      {children}
    </AddJobContext.Provider>
  );
};

export default AddJobProvider;
