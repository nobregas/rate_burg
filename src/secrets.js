import dotenv from 'dotenv'

dotenv.config({path: ".env"})

export const PORT = process.env.PORT || 3000
export const MONGODB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/your_db_name"
export const JWT_SECRET = process.env.JWT_SECRET
export const TOKEN_DURATION = process.env.TOKEN_DURATION || "15m"
export const REFRESH_TOKEN_DURATION = process.env.REFRESH_TOKEN_DURATION || "7d"
export const REFRESH_TOKEN_SECRET= process.env.REFRESH_TOKEN_SECRET