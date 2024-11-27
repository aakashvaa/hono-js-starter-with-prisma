import { HTTPException } from 'hono/http-exception'
import { ZodError } from 'zod'
import { ResponseHandler } from '../utils/responseHandler.js'

export const errorHandler = async (c, next) => {
  try {
    await next()
  } catch (error) {
    console.error('Error:', error)

    if (error instanceof HTTPException) {
      return c.json(
        ResponseHandler.error(error.message, error.status),
        error.status
      )
    }

    if (error instanceof ZodError) {
      return c.json(
        ResponseHandler.error(
          'Validation failed',
          400,
          error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        ),
        400
      )
    }

    // Handle specific error types
    switch (error.name) {
      case 'TokenExpiredError':
        return c.json(
          ResponseHandler.error('Token has expired', 401),
          401
        )
      case 'JsonWebTokenError':
        return c.json(
          ResponseHandler.error('Invalid token', 401),
          401
        )
      case 'NotFoundError':
        return c.json(
          ResponseHandler.error(error.message, 404),
          404
        )
      default:
        return c.json(
          ResponseHandler.error('Internal Server Error'),
          500
        )
    }
  }
}