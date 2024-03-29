import mongoose, { Types } from "mongoose";
import Albums from "./Albums";

const Schema = mongoose.Schema;

const TracksSchema = new Schema({
  album: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Albums",
    validate: {
      validator: async (value: Types.ObjectId) => Albums.findById(value),
      message: "Album does not exist",
    },
  },
  name: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Tracks = mongoose.model("Tracks", TracksSchema);
export default Tracks;
