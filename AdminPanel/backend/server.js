import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import auth_routes from './routes/auth_routes.js'
import cors from 'cors'

dotenv.config()
const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(cors())

connectDB();
app.use("/api/auth", auth_routes);

app.listen(process.env.PORT, () => console.log("server started !!"));
