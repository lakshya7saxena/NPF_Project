import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import volunteerRouter from "./routes/volunteer.route.js"
import adminRouter from "./routes/admin.route.js"
const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use("/api/admin/", adminRouter)
app.use("/api/volunteers/", volunteerRouter)
export default app