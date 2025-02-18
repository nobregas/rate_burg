import express from "express"
import { dbConnection } from "./config/dbConnetion.js"
import { PORT } from "../src/secrets.js"
import router from "./routes/routes.js"
import { errorMiddleWare } from "./middleware/errors.js"

dbConnection()
const app = express()

app.use(express.json())
app.use("/api", router)
app.use(errorMiddleWare)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})