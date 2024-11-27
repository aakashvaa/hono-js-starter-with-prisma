export class ResponseHandler {
  static success(data = null, message = 'Success', status = 200) {
    return {
      success: true,
      message,
      data,
      status
    }
  }

  static error(message = 'Error occurred', status = 500, errors = null) {
    return {
      success: false,
      message,
      errors,
      status
    }
  }
}