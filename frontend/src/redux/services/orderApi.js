import { api } from "./api";

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/",
        method: "POST",
        body: { ...data },
      }),
    }),
    postOrderItem: builder.mutation({
      query: (data) => ({
        url: "/orderItems/",
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const { usePostOrderMutation, usePostOrderItemMutation } = orderApi;
