import express from "express";
import { auth as protect } from "@mkproject/common";

import { createTicket } from "../controller/create-ticket";
import { createTicketValidation } from "../utils/validation/createTickets.validate";



export const router = express.Router();

router.post("/api/ticket", protect, createTicketValidation, createTicket);