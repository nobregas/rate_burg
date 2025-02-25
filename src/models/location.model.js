import mongoose from "mongoose"

const locationSchema = new mongoose.Schema({
    city: {
        type: String,
        required: [true, "City is required"]
    },
    state: {
        type: String,
        required: [true, "State is required"]
    },
    street: {
        type: String,
        required: [true, "Street is required"]
    },
    number: {
        type: Number,
        required: [true, "Number is required"]
    },
    complement: {
        type: String,
        required: [true, "Complement is required"]
    }
})

const Location = mongoose.model("Location", locationSchema)

export default Location