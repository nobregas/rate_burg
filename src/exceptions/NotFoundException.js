import { httpStatus } from "../enums/httpstatus.js";
import HttpException from "./root.js";


export class NotFoundException extends HttpException {
    constructor(message, errors, errorCode) {
        super(message, errorCode, httpStatus.NOT_FOUND, errors)
    }
}