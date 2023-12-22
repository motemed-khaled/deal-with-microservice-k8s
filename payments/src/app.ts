import express from "express";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import { errorHandler } from "@mkproject/common";

import { mountRoutes } from "./routes/mountRoutes";


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