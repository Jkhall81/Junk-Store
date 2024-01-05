import { api } from "./api";

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
    }),
    getProductById: builder.query({
      query: (productId) => `products/${productId}`,
    }),
    deleteProductById: builder.mutation({
      query: (id) => ({
        url: `/products/${id}/`,
        method: "DELETE",
      }),
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `/products/`,
        method: "POST",
        body: {
          ...data,
        },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductByIdMutation,
  useCreateProductMutation,
} = productsApi;
