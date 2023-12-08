import { ticketUpdatedListiner } from "../ticket-updated-listiner";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { TicketUpdatedEvent } from "@mkproject/common";

import { natsWrapper } from "../../../nats-wraper";
import { ticketModel } from "../../../models/ticket.model";


const setup = async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const listiner = new ticketUpdatedListiner(natsWrapper.client);
    const ticket = await ticketModel.create({ title: "dasd", price: 10 });

    const data: TicketUpdatedEvent["data"] = {
        id: ticket.id,
        title: "motemed",
        price: 200,
        userId: userId,
        version:ticket.version + 1
    };
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }
    return {msg , data , listiner , ticket}
}

describe('update ticket listiner should be ', () => {
    it("find,updated and save the ticket ", async () => {
        const { data, listiner, msg, ticket } = await setup();
        
        await listiner.onMessage(data, msg);

        const updatedTicket = await ticketModel.findById(data.id);
        expect(updatedTicket?.title).toEqual(data.title);
        expect(updatedTicket?.price).toEqual(data.price);
        expect(updatedTicket?.version).toEqual(data.version);
    });

    it("call ack method", async () => {
        const { data, listiner, msg, ticket } = await setup();

        await listiner.onMessage(data, msg);

        expect(msg.ack).toHaveBeenCalled();
    });

    it("didnt call ack method if event data have askipped version", async () => {
        const { data, listiner, msg, ticket } = await setup();
        
        data.version = 15;
        try {
            await listiner.onMessage(data, msg);
        } catch (error) {
        }

        expect(msg.ack).not.toHaveBeenCalled()
    });
});
