import express from "express";
import cookieSession from "cookie-session";
import dotenv from "dotenv";

import { mountRoutes } from "./routes/mount.routes";
import { errorHandler } from "./middlewares/error-handler";

export const app = express();
dotenv.config();

app.set("trust proxy", true);
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test"
}));

//mount routes 
mountRoutes(app);

//global error middleware
app.use(errorHandler)