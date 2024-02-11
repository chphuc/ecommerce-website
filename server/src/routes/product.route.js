import express from 'express'
import productController from '../controllers/product.controller.js'
import { verifyToken, isAdmin } from '../middlewares/index.js'

const router = express.Router()

router.get('/', productController.findAll)

router.get('/:id', productController.findOne)

router.post('/', [verifyToken, isAdmin], productController.create)

router.put('/:id', [verifyToken, isAdmin], productController.update)

router.delete('/:id', [verifyToken, isAdmin], productController.deleteOne)

router.get('/similar/:id', productController.findSimilarProducts)

router.get('/search/:name', productController.searchProduct)

export default router