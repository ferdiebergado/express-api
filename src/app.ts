import express, { NextFunction, Request, Response } from "express";
import pool from "./db";
import authRouter from "./auth/auth.router";
import { HTTP_STATUS } from "./http";
import { HttpError } from "./errors";

pool
  .getConnection()
  .then(() => {
    console.log("Connected to the database.");
  })
  .catch((err) => {
    throw err;
  });

const app = express();

app.disable("x-powered-by");

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "up" });
});

app.use("/auth", authRouter);

app.all("*", (_req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    message: "Not found.",
  });
});

app.use((err: HttpError, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || HTTP_STATUS.SERVER_ERROR;
  console.error(err.stack);
  res.status(statusCode).json({ message: err.message });
});

export default app;
