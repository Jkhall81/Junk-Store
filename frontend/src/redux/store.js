import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import { productsApi } from "./services/productsApi";
import { userApi } from "./services/userApi";
import { productsReducer } from "./reducers/products.slice";
import { cartReducer } from "./reducers/cart.slice";
import { userReducer } from "./reducers/user.slice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
