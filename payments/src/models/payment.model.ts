import mongoose from "mongoose";
import { PaymentDocument } from "../types/payments.interface";


const paymentSchema = new mongoose.Schema<PaymentDocument>({
    orderId: {
        type: String,
        required: true
    },
    stripeId: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

export const paymentModel = mongoose.model<PaymentDocument>("payment", paymentSchema);