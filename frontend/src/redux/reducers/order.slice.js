import { createSlice } from "@reduxjs/toolkit";

// const cartItemsFromStorage = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];

const initialState = {
  order: {},
  orderItem: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const { orderData } = action.payload;
      state.order = { ...orderData };

      localStorage.setItem("order", JSON.stringify(state.order));
    },
    addOrderItem: (state, action) => {
      const { orderItemData } = action.payload;
      state.orderItem.push({ ...orderItemData });
      localStorage.setItem("orderItem", JSON.stringify(state.orderItem));
    },
  },
});
export const { addOrder, addOrderItem } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
