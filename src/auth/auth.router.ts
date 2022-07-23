import express from "express";
import authController from "./auth.controller";
import authMiddleware from "./auth.middleware";

const router = express.Router();

router.post(
  "/register",
  [authMiddleware.validateRegistration],
  authController.register
);

router.post("/login", [authMiddleware.validateLogin], authController.login);

export default router;
