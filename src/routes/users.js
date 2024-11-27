import { Hono } from 'hono'
import { userController } from '../controllers/userController.js'
import { authMiddleware } from '../middleware/auth.js'

const users = new Hono()

users.get('/', userController.getAllUsers)
users.get('/:id', userController.getUserById)
users.post('/', userController.createUser)
users.put('/:id', authMiddleware, userController.updateUser)
users.delete('/:id', authMiddleware, userController.deleteUser)

export const userRoutes = users