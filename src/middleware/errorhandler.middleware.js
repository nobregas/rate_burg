import HttpException from "../exceptions/root.js";
import { HttpStatus, ErrorCodes } from "../enums/index.js";
import { InternalException, ValidationException } from "../exceptions/internalException.js";
import mongoose from 'mongoose';

export const errorHandler = (method) => {
    return async (req, res, next) => {
        try {
            await method(req, res, next);
        } catch (err) {
            let exception;
            
            if (err instanceof mongoose.Error.ValidationError) {
                exception = new ValidationException(err.message, err.errors, ErrorCodes.VALIDATION_ERROR);
            } 
            else if (err instanceof HttpException) {
                exception = err;
            } 
            else {
                console.error("Error unsolved:", err);
                exception = new InternalException("Intern Exception", err, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            
            next(exception);
        }
    };
};