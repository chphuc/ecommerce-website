import express from 'express'
import authController from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/signin', authController.signIn)

router.post('/signup', authController.signUp)

router.get('/signout', authController.signOut)

export default router