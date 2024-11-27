import { asyncWrapper } from '../utils/asyncWrapper.js'
import { ResponseHandler } from '../utils/responseHandler.js'
import { UserService } from '../services/userService.js'
import { createUserSchema, updateUserSchema } from '../validators/userValidator.js'

export const userController = {
  getAllUsers: asyncWrapper(async (c) => {
    const users = await UserService.findAll()
    return c.json(ResponseHandler.success(users))
  }),

  getUserById: asyncWrapper(async (c) => {
    const id = c.req.param('id')
    const user = await UserService.findById(id)
    
    if (!user) {
      throw new Error('User not found')
    }
    
    return c.json(ResponseHandler.success(user))
  }),

  createUser: asyncWrapper(async (c) => {
    const body = await c.req.json()
    const validatedData = createUserSchema.parse(body)
    const user = await UserService.create(validatedData)
    return c.json(ResponseHandler.success(user, 'User created successfully', 201), 201)
  }),

  updateUser: asyncWrapper(async (c) => {
    const id = c.req.param('id')
    const body = await c.req.json()
    const validatedData = updateUserSchema.parse(body)
    const user = await UserService.update(id, validatedData)
    return c.json(ResponseHandler.success(user, 'User updated successfully'))
  }),

  deleteUser: asyncWrapper(async (c) => {
    const id = c.req.param('id')
    await UserService.delete(id)
    return c.json(ResponseHandler.success(null, 'User deleted successfully'))
  })
}