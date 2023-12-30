import { createSlice } from "@reduxjs/toolkit";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? localStorage.getItem("paymentMethod")
  : "";

const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: paymentMethodFromStorage,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, qty } = action.payload;
      const existItem = state.cartItems.find((x) => x._id === product._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? { ...x, qty } : x
        );
      } else {
        state.cartItems.push({ ...product, qty });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    saveShippingAddress: (state, action) => {
      const { addressData } = action.payload;
      state.shippingAddress = { ...addressData };
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress)
      );
    },
    savePaymentMethod: (state, action) => {
      const paymentMethod = action.payload;
      state.paymentMethod = paymentMethod;
      localStorage.setItem("paymentMethod", state.paymentMethod);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
