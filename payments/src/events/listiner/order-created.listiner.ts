import { Listiner, Subject, OrderCreatedEvent } from "@mkproject/common";
import { Message } from "node-nats-streaming";

import { queueGroupName } from "./queueGroupName";
import { orderModel } from "../../models/order.model";

export class OrderCreatedListiner extends Listiner<OrderCreatedEvent> {
  subject: Subject.orderCreated = Subject.orderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const model = await orderModel.create({
      _id: data.id,
      userId: data.userId,
      price: data.ticket.price,
      status: data.status,
      version: data.version,
    });

    msg.ack();
  }
}
