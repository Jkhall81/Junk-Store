import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
  error: null,
};

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    userUpdateRequest: (state, action) => {
      state.error = null;
      const { username, first_name, last_name, password } = action.payload;
      state.userInfo = {
        username,
        first_name,
        last_name,
        password,
      };
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    userUpdateSuccess: (state, action) => {
      state.userInfo = action.payload;
    },
    userUpdateFail: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { userUpdateRequest, userUpdateSuccess, userUpdateFail } =
  updateSlice.actions;
export const updateReducer = updateSlice.reducer;
