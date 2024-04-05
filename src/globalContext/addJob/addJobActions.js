import * as types from "./types";

export const setCountryData = (value) => {
  return {
    type: types.ADD_COUNTRY_DATA,
    payload: value,
  };
};
export const setFunctionalData = (value) => {
  return {
    type: types.ADD_FUNCTIONAL_DATA,
    payload: value,
  };
};
export const setGenderPreference = (value) => {
  return {
    type: types.ADD_GENDER_PREFERENCE,
    payload: value,
  };
};
export const setJobCategory = (value) => {
  return {
    type: types.ADD_JOB_CATEGORY,
    payload: value,
  };
};
export const setJobLocation = (value) => {
  return {
    type: types.ADD_JOB_LOCATION,
    payload: value,
  };
};
export const setWorkMode = (value) => {
  return {
    type: types.ADD_WORK_MODE,
    payload: value,
  };
};
export const setJobType = (value) => {
  return {
    type: types.ADD_JOB_TYPE,
    payload: value,
  };
};

export const resetJobData = () => {
  return {
    type: types.RESET_JOB_DATA,
  };
};
