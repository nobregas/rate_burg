import {ErrorCodes, HttpStatus } from "../enums/index.js"

class RestaurantController {

    create = async (req, res) => {
        const { name, image, location } = req.body
        
        if (!name || !location) {
            throw new BadRequest("2001 - All fields are mandatory", ErrorCodes.MISSING_FIELDS, null)
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

    }

    findAll = async (req, res) => {

    }

    update = async (req, res) => {

    }

    delete = async (req, res) => {

    }
}

export default new RestaurantController()