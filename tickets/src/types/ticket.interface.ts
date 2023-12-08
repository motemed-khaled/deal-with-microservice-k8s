import { Document } from "mongoose";

interface Ticket {
    title: string,
    userId: string,
    price: number,
    orderId?:string
}

export interface TicketDocument extends Ticket, Document {
    version: number;
}