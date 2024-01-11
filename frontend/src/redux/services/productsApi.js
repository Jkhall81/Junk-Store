import { api } from "./api";

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (data) => {
        return {
          url: "products/",
          params: `?keyword=${data.keyword}&page=${data.pageParam}`,
        };
      },
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
    postProductReview: builder.mutation({
      query: (data) => ({
        url: `/reviews/`,
        method: "POST",
        body: {
          ...data,
        },
      }),
    }),
    createProduct: builder.mutation({
      query: (data) => {
        let formData = new FormData();
        formData.append("image", data.image);
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("brand", data.brand);
        formData.append("category", data.category);
        formData.append("countInStock", data.countInStock);
        formData.append("description", data.description);
        return {
          url: `/products/`,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
    }),
    patchProduct: builder.mutation({
      query: (data) => {
        let formData = new FormData();

        if (data.image) {
          formData.append("image", data.image);
        }

        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("brand", data.brand);
        formData.append("category", data.category);
        formData.append("countInStock", data.countInStock);
        formData.append("description", data.description);
        return {
          url: `/products/${data.id}/`,
          method: "PATCH",
          body: formData,
          formData: true,
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductByIdMutation,
  useCreateProductMutation,
  usePatchProductMutation,
  usePostProductReviewMutation,
} = productsApi;
