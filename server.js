import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import cors from "cors";
import userController from "./controllers/users-controller.js";

const app = express();

const connection_string = 'mongodb+srv://web-dev-final:web-dev-final@cluster0.2yymk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(connection_string);

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());

const sess = {
    secret: 'keyboard cat', // TODO: move this to environment variable
    cookie: {}
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

userController(app);

app.listen(4000);