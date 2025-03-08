import { Router } from "express";
import RestaurantController from "../controllers/restaurant.controller.js";
import { authMiddleware, roleMiddleware, errorHandler } from "../middleware/index.js";
import { Roles } from "../enums/index.js";

const restaurantRouter = Router();

restaurantRouter.post("/",[authMiddleware, roleMiddleware(Roles.ADMIN)],
    errorHandler(RestaurantController.create)
);

restaurantRouter.get("/", authMiddleware, errorHandler(RestaurantController.findAll));

restaurantRouter.get("/:id", authMiddleware, errorHandler(RestaurantController.getOne));

restaurantRouter.put("/:id",[authMiddleware, roleMiddleware(Roles.ADMIN)],
    errorHandler(RestaurantController.update)
);

restaurantRouter.delete("/:id",[authMiddleware, roleMiddleware(Roles.ADMIN)],
    errorHandler(RestaurantController.delete)
);

export default restaurantRouter;