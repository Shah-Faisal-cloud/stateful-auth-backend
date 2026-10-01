interface SuccessResponse<T> {
  success: true,
  data: T,
  message?: string,
}

function successResponse<T>(data: T, message?: string): SuccessResponse<T> {
  return message ? {
    success: true,
    message,
    data
  } : {
      success: true,
      data
  }
}

export default successResponse