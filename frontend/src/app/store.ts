import { configureStore } from "@reduxjs/toolkit";
import { spotifyReducer } from "../store/spotify";

export const store = configureStore({
  reducer: {
    spotify: spotifyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
