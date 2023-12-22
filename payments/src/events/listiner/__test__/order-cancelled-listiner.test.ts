import mongoose, { set } from "mongoose";
import {
  OrderCancelledEvent,
  OrderCreatedEvent,
  OrderStatus,
} from "@mkproject/common";
import { Message } from "node-nats-streaming";

import { orderModel } from "../../../models/order.model";
import { natsWrapper } from "../../../nats-wraper";
import { OrderCancelledListiner } from "../order-cancelled.listiner";

const setUp = async () => {
  const listiner = new OrderCancelledListiner(natsWrapper.client);

  const order = await orderModel.create({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: "dsad",
    price: 500,
    status: OrderStatus.Created,
    version: 0,
  });

  const data: OrderCancelledEvent["data"] = {
    id: order.id,
    version: 1,
    ticket: {
      id: "dsfsdf",
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listiner, data, msg, order };
};

describe("order cancelled listiner should be", () => {
    it(" update status of order", async () => {
        const { data, listiner, msg, order } = await setUp();

        await listiner.onMessage(data, msg);

        const updatedOrder = await orderModel.findOne({
            _id: data.id,
            version: data.version,
        });

        expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);
    });

    it("call the ack method", async () => {
        const { data, listiner, msg, order } = await setUp();
        await listiner.onMessage(data, msg);

        expect(msg.ack).toHaveBeenCalled();
    });
});
