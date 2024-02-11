import express from 'express'
import userController from '../controllers/user.controller.js'
import { verifyToken, isAdmin } from '../middlewares/index.js'

const router = express.Router()

router.get('/', [verifyToken, isAdmin], userController.findAll)

router.get('/me', [verifyToken], userController.findOne)

router.get('/admin/:id', [verifyToken, isAdmin], userController.findUserByAdmin)

router.put('/me', [verifyToken], userController.update)

router.put('/admin/:id', [verifyToken, isAdmin], userController.updateUserByAdmin)

router.post('/address', [verifyToken], userController.addAddress)

router.put('/address/:id', [verifyToken], userController.setDefaultAddress)

router.delete('/address/:id', [verifyToken], userController.deleteAddress)

router.post('/change-password', [verifyToken], userController.changePassword)

export default router