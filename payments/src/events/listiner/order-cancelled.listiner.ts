import { Listiner, Subject, OrderCancelledEvent, OrderStatus } from "@mkproject/common";
import { Message } from "node-nats-streaming";

import { queueGroupName } from "./queueGroupName";
import { orderModel } from "../../models/order.model";

export class OrderCancelledListiner extends Listiner<OrderCancelledEvent> {
  subject: Subject.orderCancelled = Subject.orderCancelled;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const order = await orderModel.findOne({
      _id: data.id,
      version: data.version - 1
    });

    if (!order) {
      throw new Error("order not found")
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    msg.ack();
  }
}
