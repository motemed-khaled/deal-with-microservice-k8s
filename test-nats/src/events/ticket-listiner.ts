
import { Message } from "node-nats-streaming";

import { Listiner } from "./base-listiner";


export class TicketingListiner extends Listiner{
    subject = "ticket:created";
    queueGroupName = "payment-service";
    onMessage(data: any, msg: Message): void {
        console.log("event-data", data);
        msg.ack();
    }
}