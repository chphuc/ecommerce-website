import express from 'express'
import orderController from '../controllers/order.controller.js'
import { verifyToken, isAdmin } from '../middlewares/index.js'

const router = express.Router()

router.get('/my-orders', [verifyToken], orderController.getMyOrders)

router.get('/:id', [verifyToken], orderController.getMyOrderById)

router.post('/', [verifyToken], orderController.create)

router.get('/admin/all-orders', [verifyToken, isAdmin], orderController.getAllOrders)

router.get('/admin/user-orders/:id', [verifyToken, isAdmin], orderController.getUserOrders)

router.get('/admin/:id', [verifyToken, isAdmin], orderController.getUserOrderById)

router.put('/admin/confirm/:id', [verifyToken, isAdmin], orderController.confirmOrder)

router.put('/admin/decline/:id', [verifyToken, isAdmin], orderController.declineOrder)

export default router