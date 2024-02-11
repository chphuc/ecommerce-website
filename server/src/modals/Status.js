import mongoose, { Schema, ObjectId } from "mongoose"

export default mongoose.model('Status',
    new Schema({
        id: ObjectId,
        name: { type: String, required: true },
    },
        { timestamps: true }
    )
)