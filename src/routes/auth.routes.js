import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { errorHandler } from "../middleware/errorhandler.js";

const authRouter = Router();

authRouter.post("/login", errorHandler(AuthController.login ));
authRouter.post("/register", errorHandler(AuthController.register));

export default authRouter;