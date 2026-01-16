import express from 'express'
import router from './routes/otp_routes.js'
import { connectDB } from './config/db.js'

const app = express();
app.use(express.json())
connectDB();

app.use("/", router);

app.listen(4000, () => console.log("server started "))