import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import ArtistRouter from "./router/Artist";
import AlbumsRouter from "./router/Albums";
import TreksRouter from "./router/Treks";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use("/artists", ArtistRouter);
app.use("/albums", AlbumsRouter);
app.use("/treks", TreksRouter);

const run = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect("mongodb://localhost/Spotify");

  app.listen(port, () => {
    console.log("we are live on " + port);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
