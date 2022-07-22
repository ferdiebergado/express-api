import { NextFunction, Request, Response } from "express";
import * as auth from "./auth";

export const register = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const result = auth.register(email, password);

    console.log(result);

    res.status(201).json({
      id: result,
    });
  } catch (error) {
    next(error);
  }
};
