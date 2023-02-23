import express from "express";
import mongoose from "mongoose";
import Tracks from "../model/Tracks";
import { TrackMutation } from "../types";

const TreksRouter = express.Router();

TreksRouter.get("/", async (req, res, next) => {
  try {
    const queryTrack = req.query.album as string;

    if (queryTrack === undefined) {
      const result = await Tracks.find();

      return res.send(result);
    } else {
      const result = await Tracks.find({ album: queryTrack });

      return res.send(result);
    }
  } catch (e) {
    return next(e);
  }
});

TreksRouter.post("/", async (req, res, next) => {
  const trackData: TrackMutation = {
    name: req.body.name,
    album: req.body.album,
    time: req.body.time,
    number: req.body.number,
  };

  const NewTrack = new Tracks(trackData);

  try {
    await NewTrack.save();
    return res.send(NewTrack);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.sendStatus(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default TreksRouter;
