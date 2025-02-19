import mongoose from "mongoose"
import { MONGODB_URI } from "../secrets.js"

export const dbConnection = async () => {
    try {
        const connect = await mongoose.connect(MONGODB_URI)
        console.log(`MongoDB connected: ${connect.connection.host}, ${connect.connection.name}`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

