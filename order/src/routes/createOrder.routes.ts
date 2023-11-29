import express from "express";
import "express-async-errors";
import { auth } from "@mkproject/common";

import { createOrder } from "../controller/createOrder.controller";
import { cretaeOrdersValidatin } from "../utils/validation/createOrder.validation";

export const router = express.Router();

router.post("/api/order",auth , cretaeOrdersValidatin ,  createOrder);
