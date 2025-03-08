import HttpException from "../exceptions/root.js";
import { HttpStatus, ErrorCodes, ErrorMessages } from "../enums/index.js";
import { InternalException, ValidationException } from "../exceptions/internalException.js";
import mongoose from 'mongoose';

const errorHandler = (method) => {
    return async (req, res, next) => {
        try {
            await method(req, res, next);
        } catch (err) {
            let exception;
            
            if (err instanceof mongoose.Error.ValidationError) {
                exception = new ValidationException(
                    ErrorMessages.VALIDATION_ERROR, 
                    ErrorCodes.VALIDATION_ERROR,     
                    err.errors                       
                );
            } 
            else if (err instanceof HttpException) {
                exception = err;
            } 
            else {
                console.error("Unhandled error:", err);
                exception = new InternalException(
                    ErrorMessages.SOMETHING_WENT_WRONG, 
                    ErrorCodes.SOMETHING_WENT_WRONG,    
                    err                                 
                );
            }
            
            next(exception);
        }
    };
};

export default errorHandler;