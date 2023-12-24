import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import {
  UnAuthenticatedError,
  ExpressReq,
  NotFoundError,
  OrderStatus,
  BadRequestError,
} from "@mkproject/common";

import { stripe } from "../stripe";
import { orderModel } from "../models/order.model";
import { paymentModel } from "../models/payment.model";
import { PaymentCreatedPublisher } from "../events/publisher/paymentCreated.publisher";
import { natsWrapper } from "../nats-wraper";

export const createPayment = async (
  req: ExpressReq,
  res: Response,
  next: NextFunction
) => {
  const { orderId, token } = req.body;

  const order = await orderModel.findById(orderId);

  if (!order) {
    throw new NotFoundError();
  }

  if (order.userId != req.user?.id) {
    throw new UnAuthenticatedError();
  }

  if (order.status === OrderStatus.Cancelled) {
    throw new BadRequestError("can not bay for cancelled order");
  }


  const charger = await stripe.charges.create({
    currency: "usd",
    amount: order.price * 100,
    source: token,
  });
  const payment = await paymentModel.create({
    orderId,
    stripeId: charger.id,
  });

  await new PaymentCreatedPublisher(natsWrapper.client).publish({
    id: payment.id,
    orderId: payment.orderId,
    stripeId: payment.stripeId,
  });

  res.status(201).json({ status: "success", data: payment.id });
};
