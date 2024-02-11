import express from 'express'
import roleController from '../controllers/role.controller.js'

const router = express.Router()

router.get('/', roleController.findAll)

export default router