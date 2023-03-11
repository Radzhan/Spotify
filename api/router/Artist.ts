import express from "express";
import mongoose from "mongoose";
import Artists from "../model/Artists";
import {imagesUpload} from "../multer";
import auth  from "../middleware/auth";
import permit from "../middleware/permit";

const ArtistRouter = express.Router();

ArtistRouter.get("/", async (req, res, next) => {
	try {
		const result = await Artists.find();

		return res.send(result);
	} catch (e) {
		return next(e);
	}
});

ArtistRouter.post("/", auth, imagesUpload.single("image"), async (req, res, next) => {
	try {
		const artistData = await Artists.create({
			name: req.body.name,
			description: req.body.description,
			image: req.file ? req.file.filename : null,
		});

		return res.send(artistData);
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return res.sendStatus(400).send(e);
		} else {
			return next(e);
		}
	}
});

ArtistRouter.patch("/:id/togglePublished", auth, permit('admin'), async (req, res) => {
	try {
		const request = await Artists.findById({ _id: req.params.id });

		if (!request) {
			return res.status(403).send({error: 'no artists'});
		}

		await Artists.updateOne({_id: request._id}, { isPublished: !request.isPublished });
		res.send({ message: "item was updated" });
	} catch (e) {
		res.status(400).send(e);
	}
});

ArtistRouter.delete("/:id", auth, permit('admin'), async (req, res) => {
	try {
		const request = await Artists.findById({ _id: req.params.id });

		if (!request) {
			return res.status(403).send({error: 'no artists'});
		}

		await Artists.deleteOne({ _id: req.params.id });
		res.send({ message: "item was deleted" });
	} catch (e) {
		res.status(400).send(e);
	}
});

export default ArtistRouter;
