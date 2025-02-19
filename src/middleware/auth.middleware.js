import { ErrorCodes } from "../enums/errorcodes.js"
import { UnauthorizedException } from "../exceptions/UnauthorizedException.js"
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets.js"
import User from '../models/user.model.js'

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) next(UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED))


    try {
        const payload = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(payload.id)

        if (!user) next(UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED))

        req.user = user

        next()
    } catch (err) {
        next(UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED))
    }
}

export default authMiddleware   