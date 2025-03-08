import mongoose from "mongoose"

const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: [true, "Restaurant is required"]
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: [true, "Rating is required"]
    },
    comment: {
        type: String,
        required: false
    }
})

const Rating = mongoose.model("Rating", ratingSchema)

export default Rating