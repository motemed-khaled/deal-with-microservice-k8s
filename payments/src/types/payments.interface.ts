import { Document } from "mongoose";

interface Payment {
    orderId: string,
    stripeId:string
}


export interface PaymentDocument extends Payment, Document{
    
}