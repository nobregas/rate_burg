import dotenv from 'dotenv'

dotenv.config({path: '.env'})

export const PORT = process.env.PORT || 3000
export const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/your_db_name'
export const JWT_SECRET = process.env.JWT_SECRET