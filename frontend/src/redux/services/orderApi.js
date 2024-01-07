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
    deleteOrderById: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/`,
        method: "DELETE",
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
    patchOrder: builder.mutation({
      query: (data) => ({
        url: `/orders/${data.id}/`,
        method: "PATCH",
        body: { ...data },
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
  usePatchOrderMutation,
  useDeleteOrderByIdMutation,
} = orderApi;
