import { Subject } from './subjects';


export interface TicketCreatedEvent{
    subject: Subject.createTicket;
    data: {
        id: string;
        title: string;
        price: number;
    },
}