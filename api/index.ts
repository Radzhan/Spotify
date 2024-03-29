import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import ArtistRouter from "./router/artist";
import AlbumsRouter from "./router/albums";
import TreksRouter from "./router/traks";
import usersRouter from "./router/users";
import TrackHistoryRouter from "./router/trackHistory";
import config from "./config";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use("/artists", ArtistRouter);
app.use("/albums", AlbumsRouter);
app.use("/tracks", TreksRouter);
app.use("/users", usersRouter);
app.use("/track_history", TrackHistoryRouter);

const run = async () => {
  mongoose.set("strictQuery", false);
  app.use(express.static("public"));
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log("we are live on " + port);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
