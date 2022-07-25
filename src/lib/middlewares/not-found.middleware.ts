import { Request, Response, NextFunction } from 'express'
import { NotFoundHttpError } from '../errors'

export const notFoundHandler = (
    _req: Request,
    _res: Response,
    next: NextFunction
) => {
    next(new NotFoundHttpError())
}
