import { OrderCancelledEvent } from "@mkproject/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

import { orderCancelledListiner } from "../order-cancelled-listiner";
import { natsWrapper } from "../../../nats-wraper";
import { ticketModel } from "../../../models/ticket.model";

const setUp = async () => {
    const listiner = new orderCancelledListiner(natsWrapper.client);
    const orderId = new mongoose.Types.ObjectId().toHexString();
    const ticket = await ticketModel.create({ title: "sdfds", userId: "dasd", price: 500, orderId });

    const data: OrderCancelledEvent["data"] = {
        id: orderId,
        version: 0,
        ticket: {
            id: ticket.id,
        }
    }

    // @ts-ignore
    const msg: Message = {
        ack:jest.fn()
    }
    return {data , listiner , ticket , msg , orderId}
}

describe("order cancelled listiner should be", () => {
    it("update the ticket ", async () => {
        const { data, listiner, msg, orderId, ticket } = await setUp();
        await listiner.onMessage(data, msg);
        const updatedTicket = await ticketModel.findById(ticket.id);
        expect(updatedTicket?.orderId).not.toBeDefined();
    });

    it("update the ticket and publish event and call ack method ", async () => {
        const { data, listiner, msg, orderId, ticket } = await setUp();
        await listiner.onMessage(data, msg);

        expect(natsWrapper.client.publish).toHaveBeenCalled();
        expect(msg.ack).toHaveBeenCalled();
    });
})