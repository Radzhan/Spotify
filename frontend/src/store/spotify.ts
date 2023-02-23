import { createSlice } from "@reduxjs/toolkit";
interface NewsInterface {
  newsArray: [];
}

const initialState: NewsInterface = {
  newsArray: [],
};


export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  },
});

export const newsReducer = newsSlice.reducer;
