import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { authMiddleware, errorHandler, rateLimiter } from "../middleware/index.js";

const authRouter = Router();

const ATTEMPTS = 5

authRouter.post("/login", rateLimiter(ATTEMPTS), errorHandler(AuthController.login));
authRouter.post("/register", rateLimiter(ATTEMPTS), errorHandler(AuthController.register));
authRouter.get("/current", rateLimiter(ATTEMPTS), authMiddleware, errorHandler(AuthController.current));
authRouter.post("/refresh-token", rateLimiter(ATTEMPTS), errorHandler(AuthController.refreshToken));
authRouter.post("/logout", authMiddleware, errorHandler(AuthController.logout));

export default authRouter;