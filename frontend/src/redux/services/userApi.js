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
  }),
});

export const { useLoginMutation } = userApi;
