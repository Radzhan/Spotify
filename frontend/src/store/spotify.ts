import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axiosApi from "../axiosApi";
import { Artists } from "../types";
interface spotifyInterface {
  artists: Artists[];
}

const initialState: spotifyInterface = {
  artists: [],
};

export const getArtists = createAsyncThunk<Artists[]>(
  "spotify/getAll",
  async () => {
    const request = await axiosApi.get("/artists");

    return request.data;
  }
);

export const spotifySlice = createSlice({
  name: "spotify",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArtists.fulfilled, (state, action) => {
      state.artists = action.payload;
    });
  },
});

export const spotifyReducer = spotifySlice.reducer;
export const Atrists = (state: RootState) => state.spotify.artists;

