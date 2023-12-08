import { TicketCreatedEvent } from "@mkproject/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

import { ticketCteatedListiner } from "../ticket-created-listiner";
import { natsWrapper } from "../../../nats-wraper";
import { ticketModel } from "../../../models/ticket.model";

const setup = async () => {
    const listiner = new ticketCteatedListiner(natsWrapper.client);

    const data: TicketCreatedEvent["data"] = {
        version: 0,
        id: new mongoose.Types.ObjectId().toHexString(),
        title: "cvcvcv",
        price: 10,
        userId:new mongoose.Types.ObjectId().toHexString()
    } 
    //@ts-ignore
    const msg: Message = {
        ack:jest.fn()
    }

    return {listiner , data , msg}
}

describe("ticket created listiner ", () => {
    it("should create and save message", async () => {
        const { data, listiner, msg } = await setup();
        await listiner.onMessage(data, msg);

        const ticket = await ticketModel.findById(data.id);

        expect(ticket).toBeDefined();
        expect(ticket?.title).toMatch(data.title);
        expect(ticket?.price).toEqual(data.price);
    });

    it("should ack the message", async () => {
        const { data, listiner, msg } = await setup();
        await listiner.onMessage(data, msg);
        expect(msg.ack).toHaveBeenCalled()
    });
});