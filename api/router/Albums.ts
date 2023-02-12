import express from "express";
import mongoose from "mongoose";
import Spotify from "../model/spotify";

const SpotifyRouter = express.Router();

SpotifyRouter.get("/", async (req, res, next) => {
  try {
    const queryArtist = req.query.artist as string;

    if (queryArtist === undefined) {
      const result = await Spotify.find();

      return res.send(result);
    } else {
        const result = await Spotify.findById(queryArtist);

        return res.send(result);
    }
  } catch (e) {
    return next(e);
  }
});

SpotifyRouter.post("/", async (req, res, next) => {
  const urlData = {
    name: req.body.name,
    description: req.body.description,
  };

  const NewUrl = new Spotify(urlData);

  try {
    await NewUrl.save();
    return res.send(NewUrl);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.sendStatus(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default SpotifyRouter;
