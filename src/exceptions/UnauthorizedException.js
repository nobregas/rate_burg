import { httpStatus } from "../enums/httpstatus.js";
import HttpException from "./root.js";


export class UnauthorizedException extends HttpException {
    constructor(message, errors, errorCode) {
        super(message, errorCode, httpStatus.UNAUTHORIZED, errors)
    }
}