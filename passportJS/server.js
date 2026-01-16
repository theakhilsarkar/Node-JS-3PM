import express from 'express'
import { connectDB } from './config/db.js'
import './config/passport.js'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import router from './routes/AuthRoutes.js'
import mongo from 'connect-mongo'

const app = express();
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use(session({
    secret: "abcAbc123",
    resave: false,
    saveUninitialized: false,
    store: mongo.create({
        mongoUrl: "mongodb://localhost:27017/passport"
    }),
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));

app.use(passport.initialize());
app.use(passport.session())

app.use("/", router);

app.listen(4000, () => console.log("server started "));