import express, { NextFunction, Request, Response } from "express";
import pool from "./db";
import authRouter from "./auth/auth.router";
import { HttpError } from "./errors";

pool.getConnection((err) => {
  if (err) throw err;

  console.log("Connected to the database.");
});

const app = express();

app.disable("x-powered-by");

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "up" });
});

app.use("/auth", authRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Not found.",
  });
});

app.use((err: HttpError, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

export default app;
