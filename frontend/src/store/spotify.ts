import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import axiosApi from "../axiosApi";
import {AlbumMutation, Artists, ArtistsMutaion, IAlbums, ITracks, ITracksMutation, TrackHistory} from "../types";

interface spotifyInterface {
	artists: Artists[];
	albums: IAlbums[];
	tracks: ITracks[];
	trackHistory: TrackHistory[];
}

const initialState: spotifyInterface = {
	artists: [],
	albums: [],
	tracks: [],
	trackHistory: [],
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

export const postAlbum = createAsyncThunk<void, AlbumMutation>('spotify/PostAlbum', async (arg) => {
	await axiosApi.post('albums', arg);
});

export const postArtist = createAsyncThunk<void, ArtistsMutaion>('spotify/PostArtist', async (arg) => {
	await axiosApi.post('artists', arg);
});

export const postTrack = createAsyncThunk<void, ITracksMutation>('spotify/PostTrack', async (arg) => {
	await axiosApi.post('tracks', arg);
});

export const deleteAlbum = createAsyncThunk<void, string>('spotify/DeleteAlbum', async (id) => {
	await axiosApi.delete('albums/' + id)
});

export const deleteArtist = createAsyncThunk<void, string>('spotify/DeleteArtist', async (id) => {
	await axiosApi.delete('artist/' + id)
});

export const deleteTrack = createAsyncThunk<void, string>('spotify/DeleteTrack', async (id) => {
	await axiosApi.delete('tracks/' + id)
});


export const getTracks = createAsyncThunk<ITracks[], string>(
	"spotify/tracks",
	async (arg) => {
		const request = await axiosApi.get("/tracks?album=" + arg);

		return request.data;
	}
);

export const postHistory = createAsyncThunk<void, string>(
	"spotify/History",
	async (arg) => {

		await axiosApi.post(
			"/track_history",
			{track: arg},
		);
	}
);

export const getHistory = createAsyncThunk<TrackHistory[],
	void>("spotify/getHistory", async () => {

	const request = await axiosApi.get("/track_history");

	return request.data;
});

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

		builder.addCase(getHistory.fulfilled, (state, action) => {
			state.trackHistory = action.payload;
		});
	},
});

export const spotifyReducer = spotifySlice.reducer;
export const Atrists = (state: RootState) => state.spotify.artists;
export const AlbumsArray = (state: RootState) => state.spotify.albums;
export const TracksArray = (state: RootState) => state.spotify.tracks;
export const TracksHistoryArray = (state: RootState) =>
	state.spotify.trackHistory;
