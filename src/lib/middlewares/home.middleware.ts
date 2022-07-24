import { Request, Response, NextFunction } from "express";
import { parsePackageJson } from "../helpers";

export const homeHandler = async (
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
