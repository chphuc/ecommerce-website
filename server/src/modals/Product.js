import mongoose, { Schema, ObjectId } from "mongoose"

export default mongoose.model('Product',
    new Schema({
        id: ObjectId,
        name: { type: String, required: true },
        description: { type: String, required: true },
        images: { type: [String], required: true },
        category: { type: String, required: true },
        brand: { type: String, required: true },
        regularPrice: { type: Number, required: true },
        salePrice: { type: Number, required: true },
        quantity: { type: Number, required: true },
        sold: { type: Number, default: 0 },
    },
        { timestamps: true }
    )
)