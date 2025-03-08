import { ErrorCodes, ErrorMessages } from "../enums/index.js";
import { UnauthorizedException } from "../exceptions/UnauthorizedException.js";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secrets.js";
import User from '../models/user.model.js';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new UnauthorizedException(
            ErrorMessages.MISSING_OR_INVALID_TOKEN,
            ErrorCodes.MISSING_OR_INVALID_TOKEN
        ));
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET);

        if (!payload?.id) {
            return next(new UnauthorizedException(
                ErrorMessages.INVALID_TOKEN,
                ErrorCodes.INVALID_TOKEN
            ));
        }

        const user = await User.findById(payload.id);

        if (!user) {
            return next(new UnauthorizedException(
                ErrorMessages.USER_NOT_FOUND,
                ErrorCodes.USER_NOT_FOUND
            ));
        }

        req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        next();
    } catch (err) {
        let message = ErrorMessages.INVALID_TOKEN;
        let errorCode = ErrorCodes.INVALID_TOKEN;

        if (err.name === "TokenExpiredError") {
            message = ErrorMessages.TOKEN_EXPIRED;
            errorCode = ErrorCodes.TOKEN_EXPIRED;
        }

        next(new UnauthorizedException(message, errorCode));
    }
};

export default authMiddleware;