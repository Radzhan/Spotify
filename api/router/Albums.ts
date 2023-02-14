import express from "express";
import mongoose from "mongoose";
import Albums from "../model/Albums";
import { imagesUpload } from "../multer";
import { AlbumMutation } from "../types";

const AlbumsRouter = express.Router();

AlbumsRouter.get("/", async (req, res, next) => {
  try {
    const queryArtist = req.query.artist as string;

    if (queryArtist === undefined) {
      const result = await Albums.find();

      return res.send(result);
    } else {
      const result = await Albums.find({ artists: queryArtist });
      return res.send(result);
    }
  } catch (e) {
    return next(e);
  }
});

AlbumsRouter.get("/:id", async (req, res) => {
  try {
    const result = await Albums.findById(req.params.id).populate("artists");

    if (!result) {
      return res.sendStatus(404);
    }

    return res.send(result);
  } catch {
    res.sendStatus(500);
  }
});

AlbumsRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
  const albumData: AlbumMutation = {
    artists: req.body.artists,
    name: req.body.name,
    year: req.body.year,
    image: req.file ? req.file.filename : null,
  };

  const NewUrl = new Albums(albumData);

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
