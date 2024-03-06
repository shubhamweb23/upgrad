import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./Slice/movieSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});
