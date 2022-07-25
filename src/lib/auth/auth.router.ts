import express from 'express'
import authController from './auth.controller'
import { validateRegistration, validateLogin } from './auth.middleware'

const router = express.Router()

router.post('/register', [validateRegistration], authController.register)
router.post('/login', [validateLogin], authController.login)

export default router
