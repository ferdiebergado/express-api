import express from "express";
import authRouter from "./lib/auth/auth.router";
import {
  errorHandler,
  notFoundHandler,
  requestLogger,
  homeHandler,
} from "./lib/middlewares";

const app = express();

// express settings
app.disable("x-powered-by");

// middlewares
app.use(express.json());
app.use(requestLogger);

// app routes
app.get("/", homeHandler);
app.use("/auth", authRouter);

// error handlers
app.all("*", notFoundHandler);
app.use(errorHandler);

export default app;
