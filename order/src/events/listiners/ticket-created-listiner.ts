import { Message } from "node-nats-streaming";
import { Listiner, Subject, TicketCreatedEvent } from "@mkproject/common";

import { queueGroupName } from "./queue-group-name";
import { ticketModel } from "../../models/ticket.model";


export class ticketCteatedListiner extends Listiner<TicketCreatedEvent> {
  subject: Subject.ticketCreated = Subject.ticketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const ticket = await ticketModel.create({
      _id: data.id,
      title: data.title,
      price: data.price,
    });

    msg.ack();
  }
};