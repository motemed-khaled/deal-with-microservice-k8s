
import { Message } from "node-nats-streaming";

import { Listiner } from "./base-listiner";
import { TicketCreatedEvent } from "./subject-created-event";
import { Subject } from "./subjects";


export class TicketingListiner extends Listiner<TicketCreatedEvent>{
    subject:Subject.createTicket = Subject.createTicket;
    queueGroupName = "payment-service";

    onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
        console.log("event-data", data);
        
        msg.ack();
    }
}