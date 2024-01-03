import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: "/token/",
        method: "POST",
        body: { username, password },
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/users/",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUsersQuery } = userApi;
