import mongoose, { Types } from "mongoose";
import Artists from "./Artists";

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  artists: {
    type: Schema.Types.ObjectId,
    ref: "Artists",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Artists.findById(value),
      message: "Artist does not exist",
    },
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  image: String,
});

const Albums = mongoose.model("Albums", AlbumSchema);
export default Albums;
