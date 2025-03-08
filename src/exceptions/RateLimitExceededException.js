import { HttpStatus, ErrorCodes } from "../enums/index.js";
import HttpException from "./root.js";

export class RateLimitExceededException extends HttpException {
    constructor() {
        super(
            "5001 - Too many attempts. Try again later.",
            ErrorCodes.RATE_LIMIT_EXCEEDED,
            HttpStatus.TOO_MANY_REQUESTS,
            null
        );
    }
}