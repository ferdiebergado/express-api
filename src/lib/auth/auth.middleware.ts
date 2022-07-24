import { Request, Response, NextFunction } from "express";
import config from "../../config";
import { ValidationError } from "../errors";
import messages from "../../messages";

const validateEmail = (email: string, validationError: ValidationError) => {
  if (!email) {
    validationError.addError("email", messages.email.required);
  }
};

const validatePassword = (
  password: string,
  validationError: ValidationError,
  passwordConfirmation?: string
) => {
  if (!password) {
    validationError.addError("password", messages.password.required);
  } else {
    if (passwordConfirmation && password !== passwordConfirmation) {
      validationError.addError("password", messages.password.dontMatch);
    } else {
      const { minLength, maxLength } = config.validation.auth.password;

      if (password.length < minLength) {
        validationError.addError(
          "password",
          `Password must have at least ${minLength} characters.`
        );
      }

      if (password.length > maxLength) {
        validationError.addError(
          "password",
          `Password must not exceeed ${maxLength} characters.`
        );
      }
    }
  }
};

export default {
  validateRegistration: (req: Request, _res: Response, next: NextFunction) => {
    const { email, password, password_confirmation } = req.body;

    let validationError = new ValidationError();

    validateEmail(email, validationError);

    validatePassword(password, validationError, password_confirmation);

    if (validationError.hasErrors()) {
      return next(validationError);
    }

    next();
  },

  validateLogin: (req: Request, _res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    let validationError = new ValidationError();

    validateEmail(email, validationError);

    validatePassword(password, validationError);

    if (validationError.hasErrors()) {
      return next(validationError);
    }

    next();
  },
};
