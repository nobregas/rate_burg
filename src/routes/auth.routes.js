import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { authMiddleware, errorHandler, rateLimiter } from "../middleware/index.js";

const authRouter = Router();

authRouter.post("/login", rateLimiter, errorHandler(AuthController.login ));
authRouter.post("/register", rateLimiter, errorHandler(AuthController.register));
authRouter.get("/current",rateLimiter, [authMiddleware], errorHandler(AuthController.current));

export default authRouter;