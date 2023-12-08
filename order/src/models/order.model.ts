import mongoose, { mongo } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { OrderDocument } from "../types/orderModel.interface";
import { OrderStatus } from "@mkproject/common";
export {OrderStatus}

const orderSchema = new mongoose.Schema<OrderDocument>({
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created
    },
    expireAt: {
        type: mongoose.Schema.Types.Date
    },
    ticket: {
        type: mongoose.Types.ObjectId,
        ref: "ticket"
    }
}, {
    timestamps: true, toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);


export const OrderModel = mongoose.model<OrderDocument>("orders", orderSchema);