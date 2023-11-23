import { createSlice } from "@reduxjs/toolkit";

const initialState = { loginToken: null };

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginToken: (state, action) => {
      state.loginToken = action.payload;
    },
    removeLoginToken: (state) => {
      state.loginToken = null;
    },
  },
});
export const { setLoginToken, removeLoginToken } = loginSlice.actions;
export default loginSlice.reducer;
