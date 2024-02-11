import mongoose, { Schema, ObjectId } from "mongoose"
// import validator from 'validator'

export default mongoose.model('User',
    new Schema({
        id: ObjectId,
        email: { type: String, required: true, unique: true },
        userName: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: { type: String, required: true },
        phone: { type: String, default: '' },
        role: { type: String, required: true },
        address: [{
            defaultAddress: { type: Boolean, default: false },
            province: { type: String, required: true },
            district: { type: String, required: true },
            village: { type: String, required: true },
            specificAddress: { type: String, required: true },
        }]
    },
        { timestamps: true }
    )
)