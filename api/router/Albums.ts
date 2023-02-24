import express from "express";
import mongoose from "mongoose";
import Albums from "../model/Albums";
import Tracks from "../model/Tracks";
import { imagesUpload } from "../multer";
import { AlbumMutation, AlbumWithNumber } from "../types";

const AlbumsRouter = express.Router();

AlbumsRouter.get("/", async (req, res, next) => {
  try {
    const queryArtist = req.query.artist as string;

    if (queryArtist === undefined) {
      const result = await Albums.find();

      const array: AlbumWithNumber[] = [];

      for (let i = 0; i < result.length; i++) {
        const getLast = await Tracks.findOne({ album: result[i]._id })
          .sort({ number: -1 })
          .limit(1);
        if (getLast) {
          const object = {
            _id: result[i]._id,
            artists: String(result[i].artists),
            name: result[i].name,
            year: result[i].year,
            image: result[i].image,
            col: getLast.number,
          };
          array.push(object);
        } else {
          const object = {
            _id: result[i]._id,
            artists: String(result[i].artists),
            name: result[i].name,
            year: result[i].year,
            image: result[i].image,
            col: 0,
          };
          array.push(object);
        }
      }
      return res.send(array);
    } else {
      const result = await Albums.find({ artists: queryArtist });
      const array: AlbumWithNumber[] = [];

      for (let i = 0; i < result.length; i++) {
        const getLast = await Tracks.findOne({ album: result[i]._id })
          .sort({ number: -1 })
          .limit(1);
        if (getLast) {
          const object = {
            _id: result[i]._id,
            artists: String(result[i].artists),
            name: result[i].name,
            year: result[i].year,
            image: result[i].image,
            col: getLast.number,
          };
          array.push(object);
        } else {
          const object = {
            _id: result[i]._id,
            artists: String(result[i].artists),
            name: result[i].name,
            year: result[i].year,
            image: result[i].image,
            col: 0,
          };
          array.push(object);
        }
      }
      return res.send(array);
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

  const NewObject = new Albums(albumData);

  try {
    await NewObject.save();
    return res.send(NewObject);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.sendStatus(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default AlbumsRouter;
