import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArtistsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  description: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const Artists = mongoose.model("Artists", ArtistsSchema);
export default Artists;
