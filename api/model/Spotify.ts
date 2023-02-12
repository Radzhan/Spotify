import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SpotifySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: String,
    description: String,
});

const Spotify = mongoose.model('Spotify', SpotifySchema);
export default Spotify;