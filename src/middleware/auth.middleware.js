import { ErrorCodes } from "../enums/index.js";
import { UnauthorizedException } from "../exceptions/UnauthorizedException.js";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secrets.js";
import User from '../models/user.model.js';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new UnauthorizedException("Missing or invalid token", ErrorCodes.UNAUTHORIZED));
    }

    const token = authHeader.split(" ")[1]; // get the token

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        
        if (!payload?.id) {
            return next(new UnauthorizedException("Invalid token", ErrorCodes.UNAUTHORIZED));
        }

        const user = await User.findById(payload.id);
        
        if (!user) {
            return next(new UnauthorizedException("User not found", ErrorCodes.UNAUTHORIZED));
        }

        req.user = {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role 
        };

        next();
    } catch (err) {
        let message = "Invalid token";
        if (err.name === "TokenExpiredError") {
            message = "Token expired";
        }
        next(new UnauthorizedException(message, ErrorCodes.UNAUTHORIZED));
    }
};

export default authMiddleware;