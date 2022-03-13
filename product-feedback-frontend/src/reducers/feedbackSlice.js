import { createSlice } from "@reduxjs/toolkit";
import feedbackService from "../services/feedback";

const feedbackSlice = createSlice({
  name: "feedbacks",
  initialState: {
    feedbackCount: 0,
    feedbacks: [],
  },
  reducers: {
    increment: (state) => {
      state.feedbackCount += 1;
    },
    decrement: (state) => {
      state.feedbackCount -= 1;
    },
    incrementByAmount: (state, action) => {
      state.feedbackCount += action.payload;
    },
    setFeedbacks(state, action) {
      state.feedbacks = action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  setFeedbacks,
} = feedbackSlice.actions;

export const initialiseFeedbacks = () => {
  return async (dispatch) => {
    const feedbacks = await feedbackService.getAll();
    dispatch(setFeedbacks(feedbacks));
  };
};

export default feedbackSlice.reducer;
