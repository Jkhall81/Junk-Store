import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
  error: null,
  userList: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoginRequest: (state, action) => {
      state.error = null;
      const { username, isAdmin, access, refresh, id, token } = action.payload;
      const { first_name, last_name } = token;
      state.userInfo = {
        first_name,
        last_name,
        isAdmin,
        username,
        access,
        refresh,
        id,
      };
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    userListRequest: (state, action) => {
      const users = action.payload;
      state.userList = users;
      localStorage.setItem("userList", JSON.stringify(state.userList));
    },
    userLogout: (state) => {
      state.userInfo = null;
      state.cartItems = null;
      state.shippingAddress = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("paymentMethod");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("order");
      localStorage.removeItem("orderItem");
      localStorage.removeItem("__paypal_storage__");
    },

    userDeleteRequest: (state, action) => {
      const idToDelete = action.payload;

      const updatedUserList = state.userList.filter(
        (user) => user._id !== idToDelete
      );

      state.userList = updatedUserList;

      localStorage.setItem("userList", JSON.stringify(state.userLnfo));
    },
  },
});

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
  userListRequest,
  userDeleteRequest,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
