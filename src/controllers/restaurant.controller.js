import { ErrorCodes, ErrorMessages, HttpStatus } from "../enums/index.js"
import Location from "../models/location.model.js"
import Restaurant from "../models/restaurant.model.js"
import Rating from "../models/rating.model.js"
import { BadRequest } from "../exceptions/BadRequest.js"
import { NotFoundException } from "../exceptions/NotFoundException.js"

class RestaurantController {
    // only admin
    create = async (req, res) => {
        const { name, image, location } = req.body

        if (!name || !location) {
            throw new BadRequest(ErrorMessages.MISSING_FIELDS, ErrorCodes.MISSING_FIELDS, null)
        }

        const newLocation = await Location.create(location)
        const restaurant = await Restaurant.create({
            name,
            image,
            location: newLocation._id,
            ratings: []
        })

        res.status(HttpStatus.CREATED).json(restaurant)
    }

    getOne = async (req, res) => {
        const restaurant = Restaurant.findById(req.params.id)
            .populate("location")
            .populate({
                path: "ratings",
                populate: {
                    path: "user",
                    select: "name email"
                }
            })

        if (!restaurant) {
            throw new NotFoundException(ErrorMessages.USER_NOT_FOUND, ErrorCodes.USER_NOT_FOUND, null)
        }
        res.json(restaurant)
    }

    // with filter{ city, state, sortBy }
    findAll = async (req, res) => {
        const { city, state, sortBy } = req.query;
        let filter = {};

        if (city || state) {
            const locations = await Location.find({ city, state });
            filter.location = { $in: locations.map(loc => loc._id) };
        }

        const restaurants = await Restaurant.find(filter)
            .populate('location')
            .sort(sortBy === 'rating' ? { averageRating: -1 } : {});

        res.json(restaurants);
    }

    // only admin
    update = async (req, res) => {
        const { name, image, location } = req.body;
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            throw new NotFoundException(ErrorMessages.RESTAURANT_NOT_FOUND, ErrorCodes.RESTAURANT_NOT_FOUND);
        }

        if (location) {
            await Location.findByIdAndUpdate(restaurant.location, location);
        }

        restaurant.name = name || restaurant.name;
        restaurant.image = image || restaurant.image;
        await restaurant.save();

        res.json(restaurant);
    }

    delete = async (req, res) => {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (!restaurant) {
            throw new NotFoundException(ErrorMessages.RESTAURANT_NOT_FOUND, ErrorCodes.RESTAURANT_NOT_FOUND);
        }

        await Location.findByIdAndDelete(restaurant.location);
        await Rating.deleteMany({ _id: { $in: restaurant.ratings } });

        res.status(HttpStatus.NO_CONTENT).send();
    }
}

export default new RestaurantController()