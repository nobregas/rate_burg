import { ErrorCodes } from "../enums/index.js";
import { UnauthorizedException } from '../exceptions/UnauthorizedException.js'

const roleMiddleware = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return next(new UnauthorizedException("Forbidden", ErrorCodes.FORBIDDEN));
        }
        next();
    }
};

export default roleMiddleware;