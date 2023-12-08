import { Listiner, OrderCreatedEvent, Subject } from "@mkproject/common";
import { Message } from "node-nats-streaming";

import { ticketModel } from "../../models/ticket.model";
import { queueGroupName } from "./queue-group-name";
import { TicketUpdatedPublisher } from "../publisher/ticket-updated-publisher";

export class OrderCreatedListiner extends Listiner<OrderCreatedEvent>{
    subject: Subject.orderCreated = Subject.orderCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(data:OrderCreatedEvent["data"], msg: Message) {
        const ticket = await ticketModel.findById(data.ticket.id);

        if (!ticket) {
            throw new Error("ticket not found");
        }

        ticket.set("orderId", data.id);
        await ticket.save();

       await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            userId: ticket.userId,
            title: ticket.title,
            price: ticket.price,
           version: ticket.version,
            orderId:ticket.orderId
        });

        msg.ack();
    }
};