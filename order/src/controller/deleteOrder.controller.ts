import { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { NotFoundError , UnAuthenticatedError , ExpressReq } from "@mkproject/common";

import { OrderModel, OrderStatus } from "../models/order.model";
import { natsWrapper } from "../nats-wraper";
import { OrderCancelledPublisher } from "../events/publisher/orderCancelledPublisher";

export const deleteOrder = async (
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

  order.status = OrderStatus.Cancelled;

  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    version:order.version,
    ticket: {
      id: order.ticket.id
    }
  });

  res.status(204).json({ status: "success", data: order });
};
