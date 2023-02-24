import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axiosApi from "../axiosApi";
import { Artists, IAlbums, ITracks } from "../types";
interface spotifyInterface {
  artists: Artists[];
  albums: IAlbums[];
  tracks: ITracks[];
}

const initialState: spotifyInterface = {
  artists: [],
  albums: [],
  tracks: [],
};

export const getArtists = createAsyncThunk<Artists[]>(
  "spotify/getAll",
  async () => {
    const request = await axiosApi.get("/artists");

    return request.data;
  }
);

export const getAlbums = createAsyncThunk<IAlbums[], string>(
  "spotify/albums",
  async (arg) => {
    const request = await axiosApi.get("/albums?artist=" + arg);

    return request.data;
  }
);

export const getTracks = createAsyncThunk<ITracks[], string>(
  "spotify/tracks",
  async (arg) => {
    const request = await axiosApi.get("/tracks?album=" + arg);

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
    builder.addCase(getAlbums.fulfilled, (state, action) => {
      state.albums = action.payload;
    });
    builder.addCase(getTracks.fulfilled, (state, action) => {
      state.tracks = action.payload;
    });
  },
});

export const spotifyReducer = spotifySlice.reducer;
export const Atrists = (state: RootState) => state.spotify.artists;
export const AlbumsArray = (state: RootState) => state.spotify.albums;
export const TracksArray = (state: RootState) => state.spotify.tracks;
