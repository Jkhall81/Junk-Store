import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  page: 1,
  pages: 1,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productListRequest: (state) => {
      state.products = [];
    },
  },
});

export const { productListRequest } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
