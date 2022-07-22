import express from "express";
import * as authController from "./auth.controller";

const router = express.Router();

router.post("/register", authController.register);

export default router;
