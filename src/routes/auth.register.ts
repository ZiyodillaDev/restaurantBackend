import { Router } from "express";
import { loginController } from "../controllers/login.controller.js";
import { registerController } from "../controllers/register.controller.js";
import { isAuth } from "../middlewares/isAuth.middleware.js";
export const router = Router();

router.post("/auth/register", registerController);
router.post("/auth/login", loginController);
