import mongoose, { Types } from "mongoose";
import Tracks from "./Tracks";
import Users from "./Users";

const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Users.findById(value),
      message: "User does not exist",
    },
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: "Tracks",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Tracks.findById(value),
      message: "track does not exist",
    },
  },
  datetime: {
    type: Date,
    required: true,
  },
});

const TrackHistory = mongoose.model("TrackHistory", TrackHistorySchema);
export default TrackHistory;
