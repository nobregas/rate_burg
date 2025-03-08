import { HttpStatus } from "../enums/index.js";
import HttpException from "./root.js";


export class NotFoundException extends HttpException {
    constructor(message, errors, errorCode) {
        super(message, errorCode, HttpStatus.NOT_FOUND, errors)
    }
}