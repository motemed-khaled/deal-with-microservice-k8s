import { Request, Response, NextFunction } from "express";
import { ExpressReq, NotFoundError , UnAuthenticatedError } from "@mkproject/common";
import "express-async-errors";

import { OrderModel } from "../models/order.model";

export const getOrder = async (
  req: ExpressReq,
  res: Response,
  next: NextFunction
) => {
  const order = await OrderModel.findById(req.params.id).populate("ticket");

  if (!order) {
    throw new NotFoundError();
  }

  if (req.user?.id != order.userId) {
    throw new UnAuthenticatedError();
  }

  res.status(200).json({ status: "success", data: order });
};
