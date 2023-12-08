import { Listiner, OrderCancelledEvent, Subject } from "@mkproject/common";

import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { ticketModel } from "../../models/ticket.model";
import { TicketUpdatedPublisher } from "../publisher/ticket-updated-publisher";

export class orderCancelledListiner extends Listiner<OrderCancelledEvent>{
    subject: Subject.orderCancelled = Subject.orderCancelled;
    queueGroupName: string = queueGroupName;
    async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
        const ticket = await ticketModel.findById(data.ticket.id);

        if (!ticket) {
            throw new Error("ticket not found");
        }
        ticket.set("orderId", undefined);
        await ticket.save();
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            userId: ticket.userId,
            title: ticket.title,
            price: ticket.price,
            version: ticket.version,
            orderId: ticket.orderId
        });
        msg.ack();
    }
}