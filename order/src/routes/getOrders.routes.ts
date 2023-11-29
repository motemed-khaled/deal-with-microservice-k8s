import express from "express";
import "express-async-errors";
import { auth } from "@mkproject/common";

import { getOrders } from "../controller/getOrders.controller";



export const router = express.Router();

router.get("/api/order/getorders" , auth , getOrders)