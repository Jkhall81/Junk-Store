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
        url: "/orderitems/",
        method: "POST",
        body: { ...data },
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: "/orders/",
        method: "GET",
      }),
    }),
    getOrderById: builder.query({
      query: (data) => ({
        url: `/orders/${data.id}`,
        method: "GET",
      }),
    }),
    getOrderItemByOrderId: builder.query({
      query: (itemData) => ({
        url: `/orderitems/by_order/${itemData.id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  usePostOrderMutation,
  usePostOrderItemMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useGetOrderItemByOrderIdQuery,
} = orderApi;
