import express from "express";
import { auth as protect } from "@mkproject/common";

import { updateTicket } from "../controller/update-Ticket";
import { updateTicketValidation  } from "../utils/validation/updateTicket.validate";

export const router = express.Router();

router.put("/api/ticket/:id", protect, updateTicketValidation, updateTicket);