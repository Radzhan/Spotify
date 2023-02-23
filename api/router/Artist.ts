import express from "express";
import mongoose from "mongoose";
import Artists from "../model/Artists";
import { imagesUpload } from "../multer";
import { ArtistMutation } from "../types";

const ArtistRouter = express.Router();

ArtistRouter.get("/", async (req, res, next) => {
  try {
    const result = await Artists.find();

    return res.send(result);
  } catch (e) {
    return next(e);
  }
});

ArtistRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
  const artistData: ArtistMutation = {
    name: req.body.name,
    description: req.body.description,
    image: req.file ? req.file.filename : null,
  };

  const NewArtist = new Artists(artistData);

  try {
    await NewArtist.save();
    return res.send(NewArtist);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.sendStatus(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default ArtistRouter;
