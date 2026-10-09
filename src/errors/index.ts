export class AppError extends Error {
  statusCode: number
  code: string
  
  constructor(message: string, statusCode: number, name: string = 'AppError', code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = name
  }
}


export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400, 'BadRequestError', 'BAD_REQUEST')
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'ConflictError', 'CONFLICT')
  }
}

export class InvalidCredentialsError extends AppError {
  constructor(message: string) {
    super(message, 401, 'InvalidCredentialsError', 'INVALID_CREDENTIALS')
  }
}

export class NotAuthenticatedError extends AppError {
  constructor(message: string) {
    super(message, 401, 'NotAuthenticatedError', 'NOT_AUTHENTICATED')
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404, 'NotFoundError', 'NOT_FOUND')
  }
}