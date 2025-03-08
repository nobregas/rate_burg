export const Roles = {
    ADMIN: 'admin',
    USER: 'user'
}

export const HttpStatus = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
    TOO_MANY_REQUESTS: 429
}

export const ErrorCodes = {
    // general
    NAME_REQUIRED: 1001,
    EMAIL_REQUIRED: 1002,
    EMAIL_TAKEN: 1003,
    PASSWORD_REQUIRED: 1004,
    MISSING_FIELDS: 2001,
    USER_EXISTS: 2002,


    // auth
    MISSING_OR_INVALID_TOKEN: 4001,
    INVALID_TOKEN: 4002,
    TOKEN_EXPIRED: 4003,
    USER_NOT_FOUND: 4004,
    INVALID_CREDENTIALS: 4005,
    FORBIDDEN: 4006,
    INVALID_REFRESH_TOKEN: 6000,
    MISSING_REFRESH_TOKEN: 6001,

    // validation
    VALIDATION_ERROR: 4007,

    // restaurant
    RESTAURANT_NOT_FOUND: 4008,

    // rate
    DUPLICATE_RATING: 4009,
    RATING_NOT_FOUND: 4010,

    // server
    SOMETHING_WENT_WRONG: 5001,
    RATE_LIMIT_EXCEEDED: 5002
}

export const ErrorMessages = {
    // general
    MISSING_FIELDS: "2001 - All fields are mandatory",
    SOMETHING_WENT_WRONG: "5001 - Something went wrong",
    VALIDATION_ERROR: "4007 - Validation error",

    // auth
    MISSING_OR_INVALID_TOKEN: "4001 - Missing or invalid token",
    INVALID_TOKEN: "4002 - Invalid token",
    TOKEN_EXPIRED: "4003 - Token expired",
    USER_NOT_FOUND: "4004 - User not found",
    INVALID_CREDENTIALS: "4005 - Invalid credentials",
    FORBIDDEN: "4006 - Forbidden",
    USER_EXISTS: "2002 - User already exists",
    INVALID_REFRESH_TOKEN: "6000 - Invalid refresh token",
    MISSING_REFRESH_TOKEN: "6001 - Refresh token is required",

    // restaurant
    RESTAURANT_NOT_FOUND: "4008 - Restaurant not found",

    // rate
    DUPLICATE_RATING: "4009 - User already rated this restaurant",
    RATING_NOT_FOUND: "4010 - Rating not found",

    // Rate Limit
    RATE_LIMIT_EXCEEDED: "5002 - Too many attempts. Try again later."
}