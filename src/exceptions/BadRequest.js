import { httpStatus } from "../enums/httpstatus";

export class BadRequest extends HttpException {
    constructor(message, errors, errorCode) {
        super(message, errorCode, httpStatus.BAD_REQUEST, errors)
    }
}