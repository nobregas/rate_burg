import HttpException from "../exceptions/root.js"
import { httpStatus } from "../enums/httpstatus.js";
import { InternalException } from "../exceptions/internalException.js"

export const errorHandler = (method) => {
    return async (req, res, next) => {
        try {
            await method(req, res, next)
        } catch (err) {
            let exception  

            if (err instanceof HttpException) {
                exception = err
            } else {
                exception = new InternalException("Something went wrong", err, httpStatus.INTERNAL_SERVER_ERROR)
            }
            next(exception)
        }
    }
}