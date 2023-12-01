import express from "express";
import "express-async-errors";
import { auth } from "@mkproject/common";

import { deleteOrder } from "../controller/deleteOrder.controller";
import { deleteOrderValidation } from "../utils/validation/deleteOrder.validation";

export const router = express.Router();

router.delete("/api/order/:id" , auth , deleteOrderValidation, deleteOrder);
