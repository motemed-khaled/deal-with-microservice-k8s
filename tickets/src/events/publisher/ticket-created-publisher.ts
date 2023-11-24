import { Publisher, Subject, TicketCreatedEvent } from "@mkproject/common";


export class TicketCraetedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subject.ticketCreated = Subject.ticketCreated;
}

