import { ErrorCodes } from "../enums/errorcodes"
import { UnauthorizedError } from "../errors/unauthorized.error"
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets"
import { User } from "../models/user.model"

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) next(UnauthorizedError('Unauthorized', ErrorCodes.UNAUTHORIZED))


    try {
        const payload = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(payload.id)

        if (!user) next(UnauthorizedError('Unauthorized', ErrorCodes.UNAUTHORIZED))

        req.user = user

        next()
    } catch (err) {
        next(UnauthorizedError('Unauthorized', ErrorCodes.UNAUTHORIZED))
    }
}

export default authMiddleware   