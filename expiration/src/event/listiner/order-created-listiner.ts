import { Listiner ,  OrderCreatedEvent , Subject } from "@mkproject/common";
import { Message } from 'node-nats-streaming';

import { queueGroupName } from "./queu-group-name";


export class OrderCreatedListiner extends Listiner<OrderCreatedEvent> {
  subject: Subject.orderCreated = Subject.orderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {}
}