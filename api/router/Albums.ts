import express from "express";
import mongoose from "mongoose";
import Albums from "../model/Albums";
import Tracks from "../model/Tracks";
import { imagesUpload } from "../multer";
import { AlbumWithNumber } from "../types";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const AlbumsRouter = express.Router();

AlbumsRouter.get("/",  async (req, res, next) => {
  try {
    const queryArtist = req.query.artist as string;

    if (queryArtist === undefined) {
      const result = await Albums.find().sort({ year: -1 });

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
      const result = await Albums.find({ artists: queryArtist }).sort({
        year: -1,
      });
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

AlbumsRouter.patch("/:id", auth, permit('admin'), async (req, res) => {
  try {
    const request = await Albums.findById({ _id: req.params.id });

    if (!request) {
      return res.status(403).send({error: 'no album'});
    }

    await Albums.updateOne({_id: request._id}, { isPublished: !request.isPublished });
    res.send({ message: "item was updated" });
  } catch (e) {
    res.status(400).send(e);
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

AlbumsRouter.post("/", auth, imagesUpload.single("image"), async (req, res, next) => {
  try {
  const albumData = Albums.create({
    artists: req.body.artists,
    name: req.body.name,
    year: req.body.year,
    image: req.file ? req.file.filename : null,
  });

    return res.send(albumData);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.sendStatus(400).send(e);
    } else {
      return next(e);
    }
  }
});

AlbumsRouter.delete("/:id", auth, permit('admin'), async (req, res) => {
  try {
    const request = await Albums.findById({ _id: req.params.id });

    if (!request) {
      return res.status(403).send({error: 'no album'});
    }

    await Albums.deleteOne({ _id: req.params.id });
    res.send({ message: "item was deleted" });
  } catch (e) {
    res.status(400).send(e);
  }
});

export default AlbumsRouter;
