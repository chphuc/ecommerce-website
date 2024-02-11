import express from 'express'
import brandController from '../controllers/brand.controller.js'
import { verifyToken, isAdmin } from '../middlewares/index.js'

const router = express.Router()

router.get('/', brandController.findAll)

router.get('/:id', brandController.findOne)

router.post('/', [verifyToken, isAdmin], brandController.create)

router.put('/:id', [verifyToken, isAdmin], brandController.update)

router.delete('/:id', [verifyToken, isAdmin], brandController.deleteOne)

export default router