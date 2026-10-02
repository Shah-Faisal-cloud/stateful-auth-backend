interface SuccessResponse<T> {
  success: true,
  data?: T,
  message?: string,
}

function successResponse<T>(message?: string, data?: T): SuccessResponse<T> {
  const response: SuccessResponse<T> = {
    success: true
  }

  if (data !== undefined) {
    response.data = data
  }

  if (message !== undefined) {
    response.message = message
  }

  return response
}

export default successResponse