import { HTTP_STATUS } from "./http";

export class HttpError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestHttpError extends HttpError {
  constructor(message: string) {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}

export class NotFoundHttpError extends HttpError {
  constructor(message: string) {
    super(message, HTTP_STATUS.NOT_FOUND);
  }
}

export class UserAlreadyExistsError extends BadRequestHttpError {
  constructor(email: string) {
    super(`User with email: ${email} already exists.`);
  }
}

export class UserNotFoundError extends NotFoundHttpError {
  constructor() {
    super("User not found.");
  }
}
