import express from "express";
import "express-async-errors";
import { auth } from "@mkproject/common";

import { getOrder } from "../controller/getOrder.controller";
import { getOrderValidation } from "../utils/validation/getOtder.validation";

export const router = express.Router();

router.get("/api/order/:id", auth , getOrderValidation, getOrder);
