import express from 'express'
import statisticController from '../controllers/statistic.controller.js'
import { verifyToken, isAdmin } from '../middlewares/index.js'

const router = express.Router()

router.get('/order/:timeOption', [verifyToken, isAdmin], statisticController.getStatisticOrder)

router.get('/category/:timeOption', [verifyToken, isAdmin], statisticController.getStatisticCategory)

router.get('/transaction/:timeOption', [verifyToken, isAdmin], statisticController.getStatisticTransaction)

router.get('/brand/:timeOption', [verifyToken, isAdmin], statisticController.getStatisticBrand)

export default router