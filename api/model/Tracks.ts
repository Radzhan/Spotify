import mongoose, { Types } from "mongoose";
import Albums from "./Albums";

const Schema = mongoose.Schema;

const TracksSchema = new Schema({
  album: {
    type: Schema.Types.ObjectId,
    ref: "Albums",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Albums.findById(value),
      message: "Album does not exist",
    },
  },
  name: {
    type: String,
    required: true,
  },
  time: String,
});

const Tracks = mongoose.model("Tracks", TracksSchema);
export default Tracks;
