import mongoose, { Schema, ObjectId } from "mongoose"

export default mongoose.model('Category',
    new Schema({
        id: ObjectId,
        name: { type: String, required: true },
        image: { type: String, required: true },
    },
        { timestamps: true }
    )
)