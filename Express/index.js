import * as dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from "mongoose";
import itemRouter from "./resources/item/item.router.js";
import userRouter from "./resources/user/user.router.js";
import {protect, signin, signup} from "./utils/auth.js";

dotenv.config()

const app = express();
app.disable('x-powered-by')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.post('/signup', signup)
app.post('/signin', signin)

app.use('/api', protect)
app.use('/api/item', itemRouter);
app.use('/api/user', userRouter)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to database')
    })
    .catch(err => {
        console.log(err);
    })

app.listen(3000, () => {
    console.log(`Server listening on http://localhost:3000`)
});
