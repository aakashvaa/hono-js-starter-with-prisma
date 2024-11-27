import { Hono } from 'hono'
import { authController } from '../controllers/authController.js'

const auth = new Hono()

auth.post('/login', authController.login)
auth.post('/register', authController.register)
auth.post('/refresh-token', authController.refreshToken)

export const authRoutes = auth