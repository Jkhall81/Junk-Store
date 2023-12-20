import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./reducers/products.slice";

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;
