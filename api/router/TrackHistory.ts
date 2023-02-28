import express from "express";
import mongoose from "mongoose";
import TrackHistory from "../model/TrackHistory";
import Tracks from "../model/Tracks";
import Users from "../model/Users";
import { ITracks } from "../types";

const TrackHistoryRouter = express.Router();

TrackHistoryRouter.post("/", async (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    return res.status(401).send({ error: "No token present" });
  }

  const userFromToken = await Users.findOne({ token });

  if (!userFromToken) {
    return res.status(401).send({ error: "Wrong token!" });
  }

  const datetime = new Date().toISOString();

  const TrackHistoryData = {
    user: userFromToken._id,
    track: req.body.track,
    datetime: datetime,
  };

  const NewTrackHistory = new TrackHistory(TrackHistoryData);

  try {
    await NewTrackHistory.save();
    return res.send(NewTrackHistory);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.sendStatus(400).send(e);
    } else {
      return next(e);
    }
  }
});

TrackHistoryRouter.get("/", async (req, res, next) => {
  try {
    const token = req.get("Authorization");

    if (!token) {
      return res.status(401).send({ error: "No token present" });
    }

    const userFromToken = await Users.findOne({ token });

    if (!userFromToken) {
      return res.status(401).send({ error: "Wrong token!" });
    }

    const result = await TrackHistory.find({ user: userFromToken._id });
    const array: ITracks[] = [];

    for (let i = 0; i < result.length; i++) {
      const name = await Tracks.findOne({ _id: result[i].track });
      const author = await Users.findOne({ _id: result[i].user });
      const object = {
        _id: String(result[i]._id),
        name: name?.name,
        time: String(result[i].datetime),
        author: author?.username,
      };
      array.push(object);
    }
    return res.send(array);
  } catch (e) {
    return next(e);
  }
});

export default TrackHistoryRouter;
