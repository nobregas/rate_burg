import mongoose from "mongoose"

const RestaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: [true, "Location is required"]
    },
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating'
    }]
})

const Restaurant = mongoose.model("Restaurant", RestaurantSchema)

export default Restaurant