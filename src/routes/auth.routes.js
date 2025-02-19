import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { errorHandler } from "../middleware/errorhandler.js";
import authMiddleware from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/login", errorHandler(AuthController.login ));
authRouter.post("/register", errorHandler(AuthController.register));
authRouter.get("/current",[authMiddleware], errorHandler(AuthController.current));

export default authRouter;