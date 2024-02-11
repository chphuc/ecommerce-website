import express from 'express'
import dotenv from 'dotenv'
import loader from './loaders/index.js'
dotenv.config()

const startServer = async () => {
	const app = express()
	await loader(app)

	app.listen(process.env.PORT, err => {
		if (err) {
			console.log(err)
			return
		}
		console.log(`Server is running at PORT: http://localhost:${process.env.PORT}`)
	})
}

startServer()