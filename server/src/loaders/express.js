import cookieParser from 'cookie-parser'
import bodyParser from "body-parser"
import cors from "cors"
import route from '../routes/index.js'

export default async (app) => {
    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:3001'],
        credentials: true
    }))

    app.use(cookieParser())

    app.use(bodyParser.json())

    app.use(bodyParser.urlencoded({ extended: true }))

    route(app)
}