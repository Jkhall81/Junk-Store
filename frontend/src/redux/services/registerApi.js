import { api } from "./api";

export const registerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
