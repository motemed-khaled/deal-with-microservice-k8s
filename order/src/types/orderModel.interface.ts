import mongoose, {Document} from "mongoose";

import { OrderStatus } from "@mkproject/common";
import { TicketDocument } from "./ticket.model.interface";
interface Order{
    userId: string,
    status: OrderStatus,
    expireAt: Date,
    ticket:TicketDocument
}

export interface OrderDocument extends Document, Order{
    version: number;
}