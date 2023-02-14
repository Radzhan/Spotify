import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TracksSchema = new Schema({
    album:{
        type: Schema.Types.ObjectId,
        ref: 'Albums',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    time: String,
});

const Tracks = mongoose.model('Tracks', TracksSchema);
export default Tracks;