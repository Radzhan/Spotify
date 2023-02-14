import express from "express";
import mongoose from "mongoose";
import Tracks from "../model/Tracks";
import { imagesUpload } from "../multer";

const TreksRouter = express.Router();

TreksRouter.get("/", async (req, res, next) => {
  try {
    const queryArtist = req.query.artist as string;

    if (queryArtist === undefined) {
      const result = await Tracks.find();

      return res.send(result);
    } else {
      const result = await Tracks.findById(queryArtist);

      return res.send(result);
    }
  } catch (e) {
    return next(e);
  }
});

TreksRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
  const urlData = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  };

  const NewUrl = new Tracks(urlData);

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

export default TreksRouter;
