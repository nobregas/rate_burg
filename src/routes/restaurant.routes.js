import { Router } from "express";
import RestaurantController from "../controllers/restaurant.controller.js";
import { errorHandler } from "../middleware/errorhandler.js";
import { authMiddleware, roleMiddleware } from "../middleware/index.js";
import { Roles } from "../enums/roles.js";

const router = Router();

router.post("/",[authMiddleware, roleMiddleware(Roles.ADMIN)],
    errorHandler(RestaurantController.create)
);

router.get("/", authMiddleware, errorHandler(RestaurantController.findAll));

router.get("/:id", authMiddleware, errorHandler(RestaurantController.getOne));

router.put("/:id",[authMiddleware, roleMiddleware(Roles.ADMIN)],
    errorHandler(RestaurantController.update)
);

router.delete("/:id",[authMiddleware, roleMiddleware(Roles.ADMIN)],
    errorHandler(RestaurantController.delete)
);

export default router;