import { ErrorCodes, HttpStatus, Roles, ErrorMessages } from "../enums/index.js";
import Rating from "../models/rating.model.js";
import Restaurant from "../models/restaurant.model.js";
import { NotFoundException } from "../exceptions/NotFoundException.js";
import { BadRequest } from "../exceptions/BadRequest.js";

class RatingController {

    getUserRatings = async (req, res) => {
        const ratings = await Rating.find({ user: req.user.id })
            .populate('restaurant', 'name image');
        res.json(ratings);
    }

    getRestaurantRatings = async (req, res) => {
        const ratings = await Rating.find({ restaurant: req.params.restaurantId })
            .populate('user', 'name email');
        res.json(ratings);
    }

    rateRestaurant = async (req, res) => {
        const { restaurantId, rating, comment } = req.body;
        const userId = req.user.id;

        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            throw new NotFoundException(ErrorMessages.RESTAURANT_NOT_FOUND, ErrorCodes.RESTAURANT_NOT_FOUND);
        }

        const existingRating = await Rating.findOne({ user: userId, restaurant: restaurantId });
        if (existingRating) {
            throw new BadRequest(ErrorMessages.DUPLICATE_RATING, ErrorCodes.DUPLICATE_RATING);
        }

        const newRating = await Rating.create({ user: userId, restaurant: restaurantId, rating, comment });
        restaurant.ratings.push(newRating._id);

        // atualiza media do restaurante
        const ratings = await Rating.find({ restaurant: restaurantId });
        restaurant.averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
        await restaurant.save();

        res.status(HttpStatus.CREATED).json(newRating);
    }

    // only admin
    deleteUserRating = async (req, res) => {
        const rating = await Rating.findById(req.params.ratingId);
        if (!rating) {
            throw new NotFoundException(ErrorMessages.RATING_NOT_FOUND, ErrorCodes.RATING_NOT_FOUND);
        }

        if (rating.user.toString() !== req.user.id && req.user.role !== Roles.ADMIN) {
            throw new UnauthorizedException(ErrorMessages.FORBIDDEN, ErrorCodes.FORBIDDEN);
        }

        await Rating.findByIdAndDelete(req.params.ratingId);

        // atualiza media do restaurante
        const restaurant = await Restaurant.findById(rating.restaurant);
        restaurant.ratings.pull(rating._id);
        const ratings = await Rating.find({ restaurant: restaurant._id });
        restaurant.averageRating = ratings.length > 0 ?
            ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length : 0;
        await restaurant.save();

        res.status(HttpStatus.NO_CONTENT).send();
    }


}

export default new RatingController()