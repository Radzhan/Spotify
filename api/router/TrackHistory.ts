import express from "express";
import mongoose from "mongoose";
import TrackHistory from "../model/TrackHistory";
import Users from "../model/Users";

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

export default TrackHistoryRouter;
