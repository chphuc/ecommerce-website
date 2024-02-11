import express from 'express'
import statusController from '../controllers/status.controller.js'

const router = express.Router()

router.get('/', statusController.findAll)

export default router