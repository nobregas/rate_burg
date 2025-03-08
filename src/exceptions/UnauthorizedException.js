import { HttpStatus } from "../enums/index.js";
import HttpException from "./root.js";


export class UnauthorizedException extends HttpException {
    constructor(message, errors, errorCode) {
        super(message, errorCode, HttpStatus.UNAUTHORIZED, errors)
    }
}