import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    artists:{
        type: Schema.Types.ObjectId,
        ref: 'Artists',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    image: String,
});

const Albums = mongoose.model('Albums', AlbumSchema);
export default Albums;