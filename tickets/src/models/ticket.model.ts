import mongoose from "mongoose";
import {updateIfCurrentPlugin} from "mongoose-update-if-current"

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
    },
    orderId: {
        type:String
    }
}, {
    timestamps: true, toJSON: {
        transform(doc , ret) {
            ret.id = ret._id;
            delete ret._id
    }
    }
});

ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

export const ticketModel = mongoose.model<TicketDocument>("tickets", ticketSchema);