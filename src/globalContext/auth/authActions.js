import * as types from './types';
import { StorageService } from './../../services'

export const setAuth = (values) => {
  return {
    type: types.SET_AUTH,
    payload: { ...values },
  };
};

export const clearAuthAndLogout = () => {
  return {
    type: types.CLEAR_AUTH,
  };
};
