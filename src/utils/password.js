import { randomBytes, scryptSync } from 'crypto'

export const hashPassword = (password) => {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

export const verifyPassword = (password, hashedPassword) => {
  const [salt, hash] = hashedPassword.split(':')
  const hashVerify = scryptSync(password, salt, 64).toString('hex')
  return hash === hashVerify
}