import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    originalURL: {
        type: String,
        required: true
    },
    shortURL: {
        type: String,
        required: true
    }
})

const Link = mongoose.model('Link', LinkSchema);
export default Link;

