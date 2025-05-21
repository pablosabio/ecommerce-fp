import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
        unique: true
    },
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        default: "image/jpeg"
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '30d'
    }
});

const Image = mongoose.model("Image", imageSchema);
export default Image;