import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./services/productsApi";
import { productsReducer } from "./reducers/products.slice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export default store;
