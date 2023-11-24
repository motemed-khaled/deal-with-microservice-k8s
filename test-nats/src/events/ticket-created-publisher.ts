import { Publisher } from "./base-publisher";
import { TicketCreatedEvent } from "./subject-created-event";
import { Subject } from "./subjects";


export class ticketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subject.createTicket = Subject.createTicket;

}