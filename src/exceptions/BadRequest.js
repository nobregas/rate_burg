import { httpStatus } from "../enums/httpstatus.js"
import HttpException from "./root.js"

export class BadRequest extends HttpException {
    constructor(message, errors, errorCode) {
        super(message, errorCode, httpStatus.BAD_REQUEST, errors)
    }
}