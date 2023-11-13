import express from "express";
import { auth as protect } from "@mkproject/common";

import { createTicket } from "../controller/create-ticket";



export const router = express.Router();

router.post("/api/ticket", protect, createTicket);