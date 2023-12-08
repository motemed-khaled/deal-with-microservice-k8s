import { Message } from "node-nats-streaming";
import { Listiner, Subject, TicketUpdatedEvent } from "@mkproject/common";

import { ticketModel } from "../../models/ticket.model";
import { queueGroupName } from "./queue-group-name";


export class ticketUpdatedListiner extends Listiner<TicketUpdatedEvent>{
    subject: Subject.ticketUpdated = Subject.ticketUpdated;
    queueGroupName: string = queueGroupName;

    async  onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
        const ticket = await ticketModel.findOne({ _id: data.id, version: data.version - 1 });

        if (!ticket) {
            throw new Error("ticket not found");
        }

        const { title, price } = data;
        ticket.set({ title, price });
        await ticket.save();

        msg.ack();
    }
}