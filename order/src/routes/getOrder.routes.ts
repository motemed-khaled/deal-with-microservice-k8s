import express from "express";
import "express-async-errors";

import { getOrder } from "../controller/getOrder.controller";

export const router = express.Router();

router.get("/api/order/:id", getOrder);
