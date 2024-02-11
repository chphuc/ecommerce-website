import express from 'express'
import categoryController from '../controllers/category.controller.js'
import { verifyToken, isAdmin } from '../middlewares/index.js'

const router = express.Router()

router.get('/', categoryController.findAll)

router.get('/:id', categoryController.findOne)

router.post('/', [verifyToken, isAdmin], categoryController.create)

router.put('/:id', [verifyToken, isAdmin], categoryController.update)

router.delete('/:id', [verifyToken, isAdmin], categoryController.deleteOne)

router.get('/quantity/:category', categoryController.getQuantityByCategory)

export default router