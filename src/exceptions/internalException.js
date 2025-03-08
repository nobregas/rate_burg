import { HttpStatus } from "../enums/index.js";
import HttpException from "./root.js";


export class InternalException extends HttpException {
    constructor(message, errors, errorCode) {
        super(message, errorCode, HttpStatus.INTERNAL_SERVER_ERROR, errors)
    }
}