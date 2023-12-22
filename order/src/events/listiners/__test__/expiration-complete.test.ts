import mongoose from "mongoose";
import { ExpirationCompleteEvent } from "@mkproject/common";
import { Message } from "node-nats-streaming";

import { natsWrapper } from "../../../nats-wraper";
import { ExpirationCompleteListiner } from "../expiration-complete-listiner";
import { OrderModel, OrderStatus } from "../../../models/order.model";
import { ticketModel } from "../../../models/ticket.model";

const setUp = async () => {
    const listiner = new ExpirationCompleteListiner(natsWrapper.client);

    const ticket = await ticketModel.create({
        title: "metoo",
        price: 500,
        id: new mongoose.Types.ObjectId().toHexString()
    });

    const order = await OrderModel.create({
        status: OrderStatus.Created,
        userId: new mongoose.Types.ObjectId().toHexString(),
        expireAt: new Date(),
        ticket
    });

    const data: ExpirationCompleteEvent["data"] = {
        orderId: order.id
    };

    // @ts-ignore
    const msg: Message = {
        ack:jest.fn()
    }

    return { listiner, msg, data, order, ticket };
}

describe("expiration complete listiner should be", () => {
    it("update the order status to be cancelled", async () => {
        const { data, listiner, msg } = await setUp();

        await listiner.onMessage(data, msg);
        const updatedOrder = await OrderModel.findById(data.orderId);
        expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);
    });

    it("emit an order cancelled event", async () => {
        const { data, listiner, msg, order} = await setUp();

        await listiner.onMessage(data, msg);

        expect(natsWrapper.client.publish).toHaveBeenCalled();
        const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);
        expect(eventData.id).toEqual(order.id);
    });

    it("ack the message", async () => {
        const { data, listiner, msg } = await setUp();

        await listiner.onMessage(data, msg);

        expect(msg.ack).toHaveBeenCalled();
    });
})