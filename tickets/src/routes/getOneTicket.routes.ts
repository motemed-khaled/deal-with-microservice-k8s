import express from "express";
import { auth as protect } from "@mkproject/common";

import { getticket } from "../controller/getOne-ticket";
import { getticketsValidation } from "../utils/validation/getticket.validate";


export const router = express.Router();

router.get("/api/ticket/:id",protect,getticketsValidation, getticket);