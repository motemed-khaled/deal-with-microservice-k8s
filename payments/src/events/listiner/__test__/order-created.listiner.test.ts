import { OrderCreatedEvent, OrderStatus } from "@mkproject/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

import { natsWrapper } from "../../../nats-wraper";
import { OrderCreatedListiner } from "../order-created.listiner";
import { orderModel } from "../../../models/order.model";

const setUp = async () => {
  const listiner = new OrderCreatedListiner(natsWrapper.client);

  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: "fsdfsdf",
    version: 0,
    status: OrderStatus.Created,
    expiresAt: "dasdas",
    ticket: {
      price: 500,
      id: "dasdasda",
    },
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listiner, data, msg };
};

describe("order created listiner should be", () => {
 
    it("should replicate order data", async () => {
        const { data, listiner, msg } = await setUp();

        await listiner.onMessage(data, msg);
        
        const order = await orderModel.findById(data.id);
        
        expect(order?.price).toEqual(data.ticket.price);
    });

  it("should call the ack method", async () => {
    const { data, listiner, msg } = await setUp();
    await listiner.onMessage(data, msg);
    expect(msg.ack).toHaveBeenCalled();
  });
});
