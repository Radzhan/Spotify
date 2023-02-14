import express from "express";
import mongoose from "mongoose";
import Artists from "../model/Artists";
import { imagesUpload } from "../multer";

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
  const urlData = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  };

  const NewUrl = new Artists(urlData);

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

export default ArtistRouter;
