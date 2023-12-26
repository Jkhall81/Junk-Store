import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import { productsApi } from "./services/productsApi";
import { userApi } from "./services/userApi";
import { registerApi } from "./services/registerApi";
import { productsReducer } from "./reducers/products.slice";
import { cartReducer } from "./reducers/cart.slice";
import { userReducer } from "./reducers/user.slice";
import { registerReducer } from "./reducers/register.slice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    register: registerReducer,
    [registerApi.reducerPath]: registerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
