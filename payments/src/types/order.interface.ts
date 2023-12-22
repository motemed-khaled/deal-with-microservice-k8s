import { OrderStatus } from "@mkproject/common";
import { Document } from "mongoose";

interface Order {
    userId: string;
    price: number;
    status:OrderStatus
}

export interface OrderDocument extends Order, Document{
    version:number
}