import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axiosApi from "../axiosApi";
import { Artists, IAlbums, ITracks } from "../types";
interface spotifyInterface {
  artists: Artists[];
  albums: IAlbums[];
  tracks: ITracks[];
  trackHistory: [];
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

export const postHistory = createAsyncThunk<void, string, { state: RootState }>(
  "spotify/History",
  async (arg, { getState }) => {
    const user = getState().users.user;

    if (user) {
      await axiosApi.post(
        "/track_history",
        { track: arg },
        { headers: { Authorization: user.token } }
      );
    }
  }
);

export const getHistory = createAsyncThunk<void, { state: RootState }>(
  "spotify/getHistory",
  async (getState) => {
    const user = getState.state.users.user;

    if (user) {
      const request = await axiosApi.get("/track_history", {
        headers: { Authorization: user.token },
      });

      return request.data;
    }
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
