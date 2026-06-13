import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import pointercalculationRouter from "./routes/pointerCalculation.route.js"
import predictionRouter from "./routes/predictionAnalysis.route.js"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/analytics",pointercalculationRouter)
app.use("/api/v1/predictions",predictionRouter)
export {app}