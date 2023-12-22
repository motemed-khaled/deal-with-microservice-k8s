import {
  Listiner,
  ExpirationCompleteEvent,
  Subject,
  OrderStatus,
} from "@mkproject/common";
import { Message } from "node-nats-streaming";

import { queueGroupName } from "./queue-group-name";
import { OrderModel } from "../../models/order.model";
import { OrderCancelledPublisher } from "../publisher/orderCancelledPublisher";

export class ExpirationCompleteListiner extends Listiner<ExpirationCompleteEvent> {
  subject: Subject.expirationComplete = Subject.expirationComplete;
  queueGroupName: string = queueGroupName;

  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    const order = await OrderModel.findById(data.orderId).populate("ticket");

    if (!order) {
      throw new Error("order not found");
    }

    if (order.status === OrderStatus.Complete) {
      return msg.ack();
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });
    msg.ack();
  }
}
