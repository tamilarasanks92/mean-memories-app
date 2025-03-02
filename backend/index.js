import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import postRouter from "./routes/posts.js";
import usersRouter from './routes/users.js'
import userOTPRouter from './routes/otp.js'

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/posts', postRouter)
app.use('/user', usersRouter)
app.use('/otp', userOTPRouter)

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT;

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Running in PORT ${PORT}`)))
  .catch((error) => console.log('Error while connecting', error));