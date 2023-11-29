import mongoose from "mongoose";
import { OrderStatus } from "@mkproject/common";
import { OrderModel } from "./order.model";

import { TicketDocument } from "../types/ticket.model.interface";


const ticketSchema = new mongoose.Schema<TicketDocument>({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true, toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id
        }
    }
});

ticketSchema.methods.isReserved = async function () {
    const existingOrder = await OrderModel.findOne({
      ticket: this,
      status: {
        $in: [OrderStatus.Created , OrderStatus.AwaitingPayment , OrderStatus.Complete],
      },
    });

    return !!existingOrder;
}

export const ticketModel = mongoose.model<TicketDocument>("ticket", ticketSchema);