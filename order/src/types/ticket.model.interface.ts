import { Document } from "mongoose";

interface Ticket {
    title: string,
    price:number
}


export interface TicketDocument extends Document, Ticket{
    isReserved(): Promise<boolean>;
}