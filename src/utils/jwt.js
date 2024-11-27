import jwt from 'jsonwebtoken'
import { config } from '../config/index.js'

export const generateTokens = async (user) => {
  const accessToken = jwt.sign(
    { userId: user.id },
    config.jwtSecret,
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign(
    { userId: user.id },
    config.jwtSecret,
    { expiresIn: '7d' }
  )

  return { accessToken, refreshToken }
}

export const verifyToken = async (token) => {
  return jwt.verify(token, config.jwtSecret)
}