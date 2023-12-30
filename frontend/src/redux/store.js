import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import { productsApi } from "./services/productsApi";
import { userApi } from "./services/userApi";
import { registerApi } from "./services/registerApi";
import { updateApi } from "./services/updateApi";
import { userDetailApi } from "./services/userDetailApi";
import { shippingAddressApi } from "./services/shippingAddressApi";
import { productsReducer } from "./reducers/products.slice";
import { cartReducer } from "./reducers/cart.slice";
import { userReducer } from "./reducers/user.slice";
import { registerReducer } from "./reducers/register.slice";
import { updateReducer } from "./reducers/update.slice";
import { userDetailReducer } from "./reducers/userDetail.slice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
    [shippingAddressApi.reducerPath]: shippingAddressApi.reducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    register: registerReducer,
    [registerApi.reducerPath]: registerApi.reducer,
    update: updateReducer,
    [updateApi.reducerPath]: updateApi.reducer,
    userDetail: userDetailReducer,
    [userDetailApi.reducerPath]: userDetailApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
