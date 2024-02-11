import mongoose, { Schema, ObjectId } from "mongoose"

export default mongoose.model('Order',
    new Schema({
        id: ObjectId,
        userId: { type: String, required: true },
        status: { type: String, default: 'pending' },
        confirmByAdminId: { type: String, default: '' },
        confirmAt: { type: Date },
        declineReason: { type: String, default: '' },
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
        total: { type: Number, required: true },
        shippingFee: { type: Number, default: 0 },
        address: { type: String, required: true },
        note: { type: String, default: '' },
    },
        { timestamps: true }
    )
)