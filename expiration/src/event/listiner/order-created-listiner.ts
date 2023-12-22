import { Listiner ,  OrderCreatedEvent , Subject } from "@mkproject/common";
import { Message } from 'node-nats-streaming';

import { queueGroupName } from "./queu-group-name";
import { ExpirationQueue } from "../../queues/expiration-queue";


export class OrderCreatedListiner extends Listiner<OrderCreatedEvent> {
  subject: Subject.orderCreated = Subject.orderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {

    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
 
    await ExpirationQueue.add(
      {
        orderId: data.id
      },
      {
        delay
      }
    );
    msg.ack();
  }
}