import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://junkstore-backend.onrender.com/",
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.user?.userInfo?.access;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});
