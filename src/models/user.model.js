import mongoose from "mongoose";
import { ErrorCodes, Roles } from "../enums/index.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, ErrorCodes.NAME_REQUIRED]
    },
    email: {
        type: String,
        required: [true, ErrorCodes.EMAIL_REQUIRED],
        unique: [true, ErrorCodes.EMAIL_TAKEN]
    },
    password: {
        type: String,
        required: [true, ErrorCodes.PASSWORD_REQUIRED]
    },
    role: {
        default: Roles.USER,
        type: String
    },
    image: {
        type: String
    },
    refreshToken: {
        type: String,
        default: null
    },
    favoriteRestaurants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    }]
}, {
    timestamps: true
});
const User = mongoose.model('User', userSchema);

export default User;

