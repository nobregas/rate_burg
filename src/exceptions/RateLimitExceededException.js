import { HttpStatus, ErrorCodes, ErrorMessages } from "../enums/index.js";
import HttpException from "./root.js";

export class RateLimitExceededException extends HttpException {
    constructor() {
        super(
            ErrorMessages.RATE_LIMIT_EXCEEDED,
            ErrorCodes.RATE_LIMIT_EXCEEDED,
            HttpStatus.TOO_MANY_REQUESTS,
            null
        );
    }
}