import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    reviewRequest: (state) => {
      return state.reviews;
    },
    addReview: (state, action) => {
      state.reviews.push(action.payload);
    },
  },
});

export const { reviewRequest } = reviewsSlice.actions;
export const reviewsReducer = reviewsSlice.reducer;
