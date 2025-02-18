import { ErrorCodes } from '../enums/errorcodes.js'
import { httpStatus } from '../enums/httpstatus.js'
import bcrypt from "bcrypt"
import User from '../models/user.model.js'

class AuthController {

    register = async (req, res, next) => {
        const { name, email, password } = req.body
        
        if (!name || !email || !password) {
            throw new BadRequest("2001 - All fields are mandatory", ErrorCodes.MISSING_FIELDS, null)
        }
        
        let user = await User.findOne({ email })
        if (user) throw new BadRequest("2002 - User already exists", ErrorCodes.USER_EXISTS, null)

        const hashedPassaword = await bcrypt.hash(password, 10)
        user = await User.create({
            name,
            email,
            password: hashedPassaword
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
            throw new InternalServerError("5001 - Something went wrong", ErrorCodes.SOMETHING_WENT_WRONG, null)
        }
    }

    login = async (req, res, next) => {
        
    
    }

    current = async (req, res, next) => {
        
    
    }
}

export default new AuthController()