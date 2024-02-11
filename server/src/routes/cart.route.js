import express from 'express'
import cartController from '../controllers/cart.controller.js'
import { verifyToken } from '../middlewares/index.js'

const router = express.Router()

router.get('/', [verifyToken], cartController.findOne)

router.post('/', [verifyToken], cartController.add)

router.put('/:id', [verifyToken], cartController.update)

router.delete('/:id', [verifyToken], cartController.deleteOne)

export default router 