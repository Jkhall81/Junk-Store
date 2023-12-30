import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoginRequest: (state, action) => {
      state.error = null;
      const { username, access, refresh, id } = action.payload;
      state.userInfo = {
        username,
        access,
        refresh,
        id,
      };
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    userLogout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { userLoginRequest, userLoginSuccess, userLoginFail, userLogout } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
