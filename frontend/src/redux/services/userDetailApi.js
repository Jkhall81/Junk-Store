import { api } from "./api";

export const userDetailApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => `users/${userId}`,
    }),
  }),
});

export const { useGetUserByIdQuery } = userDetailApi;
