import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
  error: null,
};

const userDetailSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    userDetailRequest: (state, action) => {
      state.error = null;
      const { data } = action.payload;
      state.userInfo = {
        ...data,
      };
    },
    userDetailSuccess: (state, action) => {
      state.userInfo = action.payload;
    },
    userDetailFail: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { userDetailRequest, userDetailuccess, userLoginFail } =
  userDetailSlice.actions;
export const userDetailReducer = userDetailSlice.reducer;
