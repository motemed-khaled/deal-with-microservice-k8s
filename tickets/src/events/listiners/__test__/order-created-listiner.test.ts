import { OrderCreatedEvent , OrderStatus } from "@mkproject/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

import { OrderCreatedListiner } from "../order-created-listiner";
import { natsWrapper } from "../../../nats-wraper";
import { ticketModel } from "../../../models/ticket.model";

const setUp = async () => {
    const listiner = new OrderCreatedListiner(natsWrapper.client);

    const ticket = await ticketModel.create({ title: "fdsfsd", price: 50, userId: "dasd" });

    const data: OrderCreatedEvent["data"] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        userId: "cczxc",
        expiresAt: "zxczxc",
        ticket: {
            id: ticket.id,
            price: ticket.price
        }
    };

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }
    
    return { listiner, ticket, data, msg }
};

describe("orderCreatedListiner should be", () => {
    it("set the order id in the ticket ", async () => {
        const { data, listiner, msg, ticket } = await setUp();
        
        await listiner.onMessage(data, msg);

        const updatedTicket = await ticketModel.findById(ticket.id);

        expect(updatedTicket?.orderId).toEqual(data.id);
    });

    it("should be call the ack method", async () => {
        const { data, msg, listiner, ticket } = await setUp();
        
        await listiner.onMessage(data, msg);

        expect(msg.ack).toHaveBeenCalled();
    });

    it("should publish a ticket update", async () => {
        const { listiner, data, msg, ticket } = await setUp();
        
        await listiner.onMessage(data, msg);

        expect(natsWrapper.client.publish).toHaveBeenCalled();
        const ticketUpdatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);
        
        expect(data.id).toEqual(ticketUpdatedData.orderId)
    });
})