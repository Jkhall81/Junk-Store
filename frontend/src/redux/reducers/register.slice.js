import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    userRegisterRequest: (state, action) => {
      state.error = null;
      const { username, first_name, last_name, password, password2 } =
        action.payload;
      state.userInfo = {
        username,
        first_name,
        last_name,
        password,
        password2,
      };
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    userRegisterSuccess: (state, action) => {
      state.userInfo = action.payload;
    },
    userRegisterFail: (state, action) => {
      state.error = action.payload;
    },
    userLogout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const {
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
  userLogout,
} = registerSlice.actions;
export const registerReducer = registerSlice.reducer;
