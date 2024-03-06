import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=f5587de9&s=${
          searchTerm ? searchTerm : "hello"
        }`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  movies: [],
  totalResults: 0,
  status: "idle",
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload.Search;
        state.totalResults = parseInt(action.payload.totalResults);
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.Search;
      });
  },
});

export default moviesSlice.reducer;
