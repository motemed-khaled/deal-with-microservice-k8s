import { Publisher, Subject, TicketUpdatedEvent } from "@mkproject/common";


export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subject.ticketUpdated = Subject.ticketUpdated;
}

