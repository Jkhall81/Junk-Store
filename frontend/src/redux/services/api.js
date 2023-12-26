import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api",
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.user?.userInfo?.access;

    if (token) {
      headers.set("Content-type", "application/json");
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});
