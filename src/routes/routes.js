import { Router } from "express";
import authRouter from "./auth.routes.js"; 
import ratingRouter from "./rating.routes.js";
import restaurantRouter from "./restaurant.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/restaurant", restaurantRouter);
router.use("/rating", ratingRouter);

export default router;
