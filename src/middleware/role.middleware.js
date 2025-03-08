import { ErrorCodes } from "../enums/errorcodes";
import { UnauthorizedException } from "../exceptions/UnauthorizedException";

const roleMiddleware = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return next(new UnauthorizedException("Forbidden", ErrorCodes.FORBIDDEN));
        }
        next();
    }
};