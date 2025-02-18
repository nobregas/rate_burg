import { httpStatus } from "../enums/httpstatus.js";
import HttpException from "./root.js";


export class InternalException extends HttpException {
    constructor(message, errors, errorCode) {
        super(message, errorCode, httpStatus.INTERNAL_SERVER_ERROR, errors)
    }
}