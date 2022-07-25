import { Request, Response, NextFunction } from 'express'
import config from '../../config'
import { UnauthorizedHttpError, ValidationError } from '../errors'
import messages from '../../messages'
import { isEmail } from '../utils'
import { verifyToken } from '../utils/jwt'

const validateEmail = (email: string, validationError: ValidationError) => {
    if (!email) {
        validationError.addError('email', messages.email.required)
    } else {
        if (!isEmail(email))
            validationError.addError('email', messages.email.invalid)
    }
}

const validatePassword = (
    password: string,
    validationError: ValidationError,
    passwordConfirmation?: string
) => {
    if (!password) {
        validationError.addError('password', messages.password.required)
    } else {
        if (passwordConfirmation && password !== passwordConfirmation) {
            validationError.addError('password', messages.password.dontMatch)
        } else {
            const { minLength, maxLength } = config.validation.auth.password

            if (password.length < minLength) {
                validationError.addError(
                    'password',
                    `Password must have at least ${minLength} characters.`
                )
            }

            if (password.length > maxLength) {
                validationError.addError(
                    'password',
                    `Password must not exceeed ${maxLength} characters.`
                )
            }
        }
    }
}

export const validateRegistration = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const { email, password, password_confirmation } = req.body

    const validationError = new ValidationError()

    validateEmail(email, validationError)

    validatePassword(password, validationError, password_confirmation)

    if (validationError.hasErrors()) {
        return next(validationError)
    }

    next()
}

export const validateLogin = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body

    const validationError = new ValidationError()

    validateEmail(email, validationError)

    validatePassword(password, validationError)

    if (validationError.hasErrors()) {
        return next(validationError)
    }

    next()
}

export const decodeToken = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) throw new UnauthorizedHttpError()

        await verifyToken(token)

        next()
    } catch (error) {
        next(error)
    }
}
