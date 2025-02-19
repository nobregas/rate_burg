import { ErrorCodes } from "../enums/errorcodes.js"
import { UnauthorizedException } from "../exceptions/UnauthorizedException.js"
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets.js"
import User from '../models/user.model.js'

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization
    if (!token) next(new UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED))
    try {
        const payload = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(payload.id)

        if (!user) next(new UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED))

        req.user = {user: {
            id: user.id,
            name: user.name,
            email: user.email
        }}

        next()
    } catch (err) {
        next(new UnauthorizedException('Unauthorized', ErrorCodes.UNAUTHORIZED))
    }
}

export default authMiddleware   