import {
  Listiner,
  OrderStatus,
  paymentCreatedEvent,
  Subject,
} from "@mkproject/common";

import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { OrderModel } from "../../models/order.model";

export class PaymentCreatedListiner extends Listiner<paymentCreatedEvent> {
  subject: Subject.paymentCreated = Subject.paymentCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: paymentCreatedEvent["data"], msg: Message) {
    const order = await OrderModel.findById(data.orderId);

    if (!order) {
      throw new Error("order not found");
    }

    order.set("status", OrderStatus.Complete);
    await order.save();

    msg.ack();
  }
}
