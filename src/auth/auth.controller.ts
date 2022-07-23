import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../http";
import auth from "./auth";

export default {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const id = await auth.register(email, password);

      res.status(HTTP_STATUS.CREATED).json({
        id,
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const result = await auth.login(email, password);

      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};
