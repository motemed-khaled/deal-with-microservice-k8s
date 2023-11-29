import { Request, Response, NextFunction } from "express";
import "express-async-errors";
import {
  BadRequestError,
  NotFoundError,
  ExpressReq,
  
} from "@mkproject/common";

import { OrderModel, OrderStatus } from "../models/order.model";
import { ticketModel } from "../models/ticket.model";

export const createOrder = async (
  req: ExpressReq,
  res: Response,
  next: NextFunction
) => {

  const EXPIRATION_WINDOW_SECONDS = 15 * 60;
  const { ticketId } = req.body;

  const ticket = await ticketModel.findById(ticketId);

  if (!ticket) {
    throw new NotFoundError();
  }
  const isReserved = await ticket.isReserved();
  if (isReserved) {
    throw new BadRequestError("ticket alredy reserved");
  }

  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

  const order = await OrderModel.create({
    userId: req.user?.id,
    status: OrderStatus.Created,
    ticket,
    expireAt:expiration
  });

  res.status(201).json(order);
};
