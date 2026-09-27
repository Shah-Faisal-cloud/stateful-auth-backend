interface SuccessResponse<T> {
  success: true,
  data: T
}

function successResponse<T>(data: T): SuccessResponse<T> {
  return {
    success: true,
    data
  }
}

export default successResponse