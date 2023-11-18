import express from "express";

import { gitTicket } from "../controller/gitTicket";


export const router = express.Router();

router.get("/api/ticket", gitTicket);