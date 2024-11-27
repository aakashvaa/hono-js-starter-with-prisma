import { prisma } from '../lib/prisma.js'
import { hashPassword } from '../utils/password.js'

export class UserService {
  static async findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    })
  }

  static async findById(id) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    })
  }

  static async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    })
  }

  static async create(userData) {
    const hashedPassword = await hashPassword(userData.password)
    
    return prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    })
  }

  static async update(id, userData) {
    if (userData.password) {
      userData.password = await hashPassword(userData.password)
    }

    return prisma.user.update({
      where: { id },
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        updatedAt: true,
      },
    })
  }

  static async delete(id) {
    return prisma.user.delete({
      where: { id },
    })
  }
}