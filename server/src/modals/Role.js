import mongoose, { Schema, ObjectId } from "mongoose"

export default mongoose.model('Role',
    new Schema({
        id: ObjectId,
        name: { type: String, required: true }
    },
        { timestamps: true }
    )
)