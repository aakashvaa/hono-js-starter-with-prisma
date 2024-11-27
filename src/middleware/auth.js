import { HTTPException } from 'hono/http-exception'
import { verifyToken } from '../utils/jwt.js'

export const authMiddleware = async (c, next) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '')
  
  if (!token) {
    throw new HTTPException(401, { message: 'No token provided' })
  }

  try {
    const decoded = await verifyToken(token)
    c.set('user', decoded)
    await next()
  } catch (error) {
    throw new HTTPException(401, { message: 'Invalid token' })
  }
}