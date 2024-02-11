import mongoose, { Schema, ObjectId } from "mongoose"

export default mongoose.model('Cart',
    new Schema({
        id: ObjectId,
        userId: { type: String, required: true },
        products: [
            {
                productId: { type: String, required: true },
                name: { type: String, required: true },
                description: { type: String, required: true },
                images: { type: [String], required: true },
                category: { type: String, required: true },
                brand: { type: String, required: true },
                regularPrice: { type: Number, required: true },
                salePrice: { type: Number, required: true },
                quantity: { type: Number, required: true },
            }
        ],
    },
        { timestamps: true }
    )
)