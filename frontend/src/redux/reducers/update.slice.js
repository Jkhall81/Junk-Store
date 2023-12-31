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
      const { id, username, first_name, last_name, password } = action.payload;
      state.userInfo = {
        id,
        username,
        first_name,
        last_name,
        password,
      };
      const currentLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
      currentLocalStorage.username = username;
      localStorage.setItem("userInfo", JSON.stringify(currentLocalStorage));
    },
  },
});

export const { userUpdateRequest, userUpdateSuccess, userUpdateFail } =
  updateSlice.actions;
export const updateReducer = updateSlice.reducer;
