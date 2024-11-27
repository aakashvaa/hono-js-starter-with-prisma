export const asyncWrapper = (handler) => {
  return async (c, next) => {
    try {
      return await handler(c, next)
    } catch (error) {
      throw error
    }
  }
}