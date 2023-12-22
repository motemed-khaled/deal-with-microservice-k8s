import express from "express";
import { auth } from "@mkproject/common";

import { createPayment } from "../controller/createPayment.controller";
import { createPaymentValidation } from "../utils/validation/payments.validation";

export const router = express.Router();

router.post("/api/payments" ,auth,createPaymentValidation, createPayment)