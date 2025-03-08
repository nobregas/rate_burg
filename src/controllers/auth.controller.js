import { ErrorCodes, HttpStatus, ErrorMessages } from "../enums/index.js"
import { BadRequest } from '../exceptions/BadRequest.js';
import { NotFoundException } from '../exceptions/NotFoundException.js';
import { UnauthorizedException } from '../exceptions/UnauthorizedException.js';
import { InternalException } from '../exceptions/internalException.js';
import bcrypt, { compareSync } from "bcrypt"
import { JWT_SECRET, TOKEN_DURATION } from '../secrets.js'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

class AuthController {

    register = async (req, res, next) => {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            throw new BadRequest(ErrorMessages.MISSING_FIELDS, null, ErrorCodes.MISSING_FIELDS,)
        }

        let user = await User.findOne({ email })
        if (user) throw new BadRequest(ErrorMessages.USER_EXISTS, null, ErrorCodes.USER_EXISTS,)

        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        if (user) {
            res.status(HttpStatus.CREATED).json({
                id: user.id,
                name: user.name,
                email: user.email
            })
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: ErrorMessages.SOMETHING_WENT_WRONG
            })
            throw new InternalException(ErrorMessages.SOMETHING_WENT_WRONG, ErrorCodes.SOMETHING_WENT_WRONG, null)
        }
    }

    login = async (req, res, next) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) throw new NotFoundException(ErrorMessages.USER_NOT_FOUND, ErrorCodes.USER_NOT_FOUND, null);
        if (!compareSync(password, user.password)) throw new UnauthorizedException(ErrorMessages.INVALID_CREDENTIALS, ErrorCodes.INVALID_CREDENTIALS, null);

        // tokens
        const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: TOKEN_DURATION });
        const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_DURATION });

        user.refreshToken = refreshToken;
        await user.save();

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            accessToken,
            refreshToken
        });
    }

    current = async (req, res, next) => {
        res.json(req.user)
    }

    refreshToken = async (req, res, next) => {
        const { refreshToken } = req.body;
        if (!refreshToken) throw new BadRequest(ErrorMessages.MISSING_FIELDS, ErrorCodes.MISSING_FIELDS, null);

        try {
            const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
            const user = await User.findById(payload.id);

            if (!user || user.refreshToken !== refreshToken) {
                throw new UnauthorizedException(ErrorMessages.INVALID_TOKEN, ErrorCodes.INVALID_TOKEN, null);
            }

            const newAccessToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: TOKEN_DURATION });
            
            res.json({
                accessToken: newAccessToken
            });
        } catch (err) {
            throw new UnauthorizedException(ErrorMessages.INVALID_TOKEN, ErrorCodes.INVALID_TOKEN, null);
        }
    }

    logout = async (req, res, next) => {
        const userId = req.user.id;
        await User.findByIdAndUpdate(userId, { refreshToken: null });
        res.status(HttpStatus.NO_CONTENT).send();
    }

}

export default new AuthController()