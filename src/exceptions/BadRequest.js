import { HttpStatus } from "../enums/index.js";
import HttpException from "./root.js"

export class BadRequest extends HttpException {
    constructor(message, errors, errorCode) {
        super(message, errorCode, HttpStatus.BAD_REQUEST, errors)
    }
}