import { Document } from "mongoose";

interface Ticket {
    title: string,
    userId: string,
    price:number
}

export interface TicketDocument extends Ticket , Document{}