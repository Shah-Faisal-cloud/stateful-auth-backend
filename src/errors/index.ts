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

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401, 'UnauthorizedError', 'UNAUTHORIZED')
  }
}