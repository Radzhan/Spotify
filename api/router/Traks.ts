import express from "express";
import mongoose from "mongoose";
import Tracks from "../model/Tracks";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const TreksRouter = express.Router();

TreksRouter.get("/", async (req, res, next) => {
	try {
		const queryTrack = req.query.album as string;

		if (queryTrack === undefined) {
			const result = await Tracks.find().sort({number: 1});

			return res.send(result);
		} else {
			const result = await Tracks.find({album: queryTrack}).sort({
				number: 1,
			});

			return res.send(result);
		}
	} catch (e) {
		return next(e);
	}
});


TreksRouter.patch("/:id/togglePublished", auth, permit('admin'), async (req, res) => {
	try {
		const request = await Tracks.findById({ _id: req.params.id });

		if (!request) {
			return res.status(403).send({error: 'no Track'});
		}

		await Tracks.updateOne({_id: request._id}, { isPublished: !request.isPublished });
		res.send({ message: "item was updated" });
	} catch (e) {
		res.status(400).send(e);
	}
});

TreksRouter.post("/", auth, async (req, res, next) => {
	try {
		const trackData = await Tracks.create({
			name: req.body.name,
			album: req.body.album,
			time: req.body.time,
			number: req.body.number,
		});

		return res.send(trackData);
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return res.sendStatus(400).send(e);
		} else {
			return next(e);
		}
	}
});

TreksRouter.delete("/:id", auth, permit('admin'), async (req, res) => {
	try {
		const request = await Tracks.findById({ _id: req.params.id });

		if (!request) {
			return res.status(403).send({error: 'no track'});
		}

		await Tracks.deleteOne({ _id: req.params.id });
		res.send({ message: "item was deleted" });
	} catch (e) {
		res.status(400).send(e);
	}
});

export default TreksRouter;
