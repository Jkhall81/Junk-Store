import { api } from "./api";

export const updateApi = api.injectEndpoints({
  endpoints: (builder) => ({
    update: builder.mutation({
      query: (credentials) => ({
        url: `/users/${credentials.id}/`,
        method: "PATCH",
        body: credentials,
      }),
    }),
  }),
});

export const { useUpdateMutation } = updateApi;
