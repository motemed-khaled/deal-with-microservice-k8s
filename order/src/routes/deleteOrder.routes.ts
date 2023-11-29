import express from "express";
import "express-async-errors";

import { deleteOrder } from "../controller/deleteOrder.controller";

export const router = express.Router();

router.delete("/api/order/:id", deleteOrder);
