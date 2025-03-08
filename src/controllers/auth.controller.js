import { ErrorCodes } from '../enums/errorcodes.js'
import { httpStatus } from '../enums/httpstatus.js'
import { BadRequest } from '../exceptions/BadRequest.js'
import { InternalException } from '../exceptions/internalException.js'
import { NotFoundException } from '../exceptions/NotFoundException.js'
import { UnauthorizedException } from '../exceptions/UnauthorizedException.js'
import bcrypt, { compareSync } from "bcrypt"
import { JWT_SECRET, TOKEN_DURATION } from '../secrets.js'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

class AuthController {

    register = async (req, res, next) => {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            throw new BadRequest("2001 - All fields are mandatory", ErrorCodes.MISSING_FIELDS, null)
        }

        let user = await User.findOne({ email })
        if (user) throw new BadRequest("2002 - User already exists", ErrorCodes.USER_EXISTS, null)

        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        if (user) {
            res.status(httpStatus.CREATED).json({
                id: user.id,
                name: user.name,
                email: user.email
            })
        } else {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: "5001 - Something went wrong"
            })
            throw new InternalException("5001 - Something went wrong", ErrorCodes.SOMETHING_WENT_WRONG, null)
        }
    }

    login = async (req, res, next) => {
        const { email, password } = req.body
        let user = await User.findOne({ email })

        if (!user) throw new NotFoundException("User not found", ErrorCodes.USER_NOT_FOUND, null)
        if (!compareSync(password, user.password)) throw new UnauthorizedException("Invalid credentials", ErrorCodes.INVALID_CREDENTIALS, null)        
        
        const token = jwt.sign({ id: user.id }, JWT_SECRET, {
                expiresIn: TOKEN_DURATION
        })
        
        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }, 
            token   
        })
    }

    current = async (req, res, next) => {
        res.json(req.user)
    }
}

export default new AuthController()