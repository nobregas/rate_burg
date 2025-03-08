import { Router } from "express";
import RatingController from "../controllers/rating.controller.js";
import { authMiddleware, roleMiddleware, errorHandler } from "../middleware/index.js";
import { Roles } from "../enums/index.js";

const ratingRouter = Router();

ratingRouter.post("/", authMiddleware, 
    errorHandler(RatingController.rateRestaurant)
);
ratingRouter.get("/restaurant/:restaurantId", 
    errorHandler(RatingController.getRestaurantRatings)
);
ratingRouter.get("/user", authMiddleware, 
    errorHandler(RatingController.getUserRatings)
);
ratingRouter.delete("/:ratingId", [authMiddleware, roleMiddleware(Roles.ADMIN)], 
    errorHandler(RatingController.deleteUserRating)
);

export default ratingRouter;