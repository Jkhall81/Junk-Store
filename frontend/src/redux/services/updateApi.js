import { api } from "./api";

export const updateApi = api.injectEndpoints({
  endpoints: (builder) => ({
    update: builder.mutation({
      query: (credentials, id) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useUpdateMutation } = updateApi;
