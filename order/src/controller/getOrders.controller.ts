import {  Response, NextFunction } from "express";
import { ExpressReq } from "@mkproject/common";
import "express-async-errors";
import { OrderModel } from "../models/order.model";

export const getOrders = async (
  req: ExpressReq,
  res: Response,
  next: NextFunction
) => {
  const orders = await OrderModel.find({ userId: req.user?.id }).populate(
    "ticket"
  );
  res.status(200).json({ data: orders });
};
