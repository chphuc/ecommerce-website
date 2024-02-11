import mongoose from "mongoose"
import roleController from "../controllers/role.controller.js"
import statusController from "../controllers/status.controller.js";

mongoose.set("strictQuery", false);
export default async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("Successfully connect to MongoDB.")
        roleController.initRole()
        statusController.initStatus()
    } catch (err) {
        console.error("Connection error", err);
        process.exit();
    }
}