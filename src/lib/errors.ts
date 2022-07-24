import { HTTP_STATUS } from "./http";

export class HttpError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

export class BadRequestHttpError extends HttpError {
  constructor(message: string) {
    super(HTTP_STATUS.BAD_REQUEST, message);
  }
}

export class UnprocessableEntityHttpError extends HttpError {
  constructor(message: string) {
    super(HTTP_STATUS.UNPROCESSABLE_ENTITY, message);
  }
}

export class NotFoundHttpError extends HttpError {
  constructor(message: string) {
    super(HTTP_STATUS.NOT_FOUND, message);
  }
}

class FieldError {
  field: string;
  errors: string[];

  constructor(field: string) {
    this.field = field;
    this.errors = [];
  }

  addError(error: string) {
    this.errors.push(error);
  }
}

export class ValidationError extends UnprocessableEntityHttpError {
  private errors: FieldError[];

  constructor() {
    super("Invalid input.");
    this.errors = [];
  }

  addError(field: string, errMsg: string) {
    let fieldError = this.errors.find((f) => f.field === field);

    if (fieldError) {
      fieldError.addError(errMsg);
    } else {
      fieldError = new FieldError(field);
      fieldError.addError(errMsg);
    }

    this.errors.push(fieldError);
  }

  getErrors() {
    return this.errors;
  }

  hasErrors() {
    return this.errors.length > 0;
  }
}
