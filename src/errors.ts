import { HTTP_STATUS } from "./http";

export class ErrorBag {
  private errors: Error[];

  constructor() {
    this.errors = [];
  }

  add(error: Error) {
    this.errors.push(error);
  }

  getErrors() {
    return this.errors;
  }

  hasErrors() {
    return this.errors.length > 0;
  }
}

export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
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
