import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./services/productsApi";
import { productsReducer } from "./reducers/products.slice";
import { cartReducer } from "./reducers/cart.slice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export default store;
