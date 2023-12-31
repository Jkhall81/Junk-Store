import { api } from "./api";

export const shippingAddressApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postAddress: builder.mutation({
      query: (data) => ({
        url: "/shippingaddress/",
        method: "POST",
        body: { ...data },
      }),
    }),
    patchAddress: builder.mutation({
      query: (data) => ({
        url: `/shippingaddress/${data.id}/`,
        method: "PATCH",
        body: { ...data },
      }),
    }),
  }),
});

export const { usePostAddressMutation, usePatchAddressMutation } =
  shippingAddressApi;
