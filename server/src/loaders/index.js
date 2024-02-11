import expessLoader from './express.js'
import mongooseLoader from "./mongoose.js";

export default async (app) => {
    await mongooseLoader()
    console.log('MongoDB Initialized')

    await expessLoader(app)
    console.log('Express Initialized')
}