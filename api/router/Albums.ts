import express from "express";
import mongoose from "mongoose";
import Albums from "../model/Albums";
import { imagesUpload } from "../multer";

const AlbumsRouter = express.Router();

AlbumsRouter.get("/", async (req, res, next) => {
  try {
    const queryArtist = req.query.artist as string;

    if (queryArtist === undefined) {
      const result = await Albums.find();

      return res.send(result);
    } else {
      const result = await Albums.findById(queryArtist);

      return res.send(result);
    }
  } catch (e) {
    return next(e);
  }
});

AlbumsRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
  const urlData = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  };

  const NewUrl = new Albums(urlData);

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

export default AlbumsRouter;
