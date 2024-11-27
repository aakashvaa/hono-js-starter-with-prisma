import { asyncWrapper } from '../utils/asyncWrapper.js'
import { ResponseHandler } from '../utils/responseHandler.js'
import { loginSchema } from '../validators/authValidator.js'
import { verifyPassword } from '../utils/password.js'
import { UserService } from '../services/userService.js'
import { generateTokens } from '../utils/jwt.js'

export const authController = {
  login: asyncWrapper(async (c) => {
    const body = await c.req.json()
    const { email, password } = loginSchema.parse(body)

    const user = await UserService.findByEmail(email)
    if (!user || !verifyPassword(password, user.password)) {
      throw new Error('Invalid credentials')
    }

    const tokens = await generateTokens(user)
    return c.json(ResponseHandler.success({ user, ...tokens }))
  }),

  register: asyncWrapper(async (c) => {
    const userData = await c.req.json()
    const validatedData = createUserSchema.parse(userData)
    const user = await UserService.create(validatedData)
    const tokens = await generateTokens(user)
    
    return c.json(
      ResponseHandler.success(
        { user, ...tokens },
        'User registered successfully',
        201
      ),
      201
    )
  }),

  refreshToken: asyncWrapper(async (c) => {
    const { refreshToken } = await c.req.json()
    const tokens = await UserService.refreshToken(refreshToken)
    return c.json(ResponseHandler.success(tokens))
  })
}