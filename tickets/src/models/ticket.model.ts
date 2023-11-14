import mongoose from "mongoose";

import { TicketDocument } from "../types/ticket.interface";

const ticketSchema = new mongoose.Schema<TicketDocument>({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true, toJSON: {
        transform(doc , ret) {
            ret.id = ret._id;
            delete ret._id
    }
} });

export const ticketModel = mongoose.model("tickets", ticketSchema);