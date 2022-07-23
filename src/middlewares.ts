import { Request, Response, NextFunction } from "express";
import { HttpError, NotFoundHttpError, ValidationError } from "./errors";
import { parsePackageJson } from "./helpers";
import { HTTP_STATUS } from "./http";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestStart = Date.now();

  res.on("finish", () => {
    const { httpVersion, method, url } = req;
    // const { remoteAddress } = req.socket;

    const processingTime = Date.now() - requestStart;

    const timestamp = new Date(requestStart).toISOString();

    console.log(
      `${timestamp}: ${method} ${url} HTTP ${httpVersion} -> ${res.statusCode} ${res.statusMessage} ${processingTime} ms`
    );
  });

  next();
};

export const rootHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, version } = (await parsePackageJson()) as any;

    res.json({ name, version, status: "up" });
  } catch (err) {
    next(err);
  }
};

export const errorHandler = (
  err: HttpError,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || HTTP_STATUS.SERVER_ERROR;
  console.error(err.stack);
  res.status(statusCode);

  if (err instanceof ValidationError) {
    res.json({
      message: err.message,
      errors: err.getErrors(),
    });
  } else {
    res.json({ message: err.message });
  }
};

export const notFoundHandler = (_req: Request, _res: Response) => {
  throw new NotFoundHttpError("Not found.");
};
