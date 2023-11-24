import { Response, NextFunction } from "express";
import { ExpressReq, NotFoundError, UnAuthenticatedError } from "@mkproject/common";

import { ticketModel } from "../models/ticket.model";
import { TicketUpdatedPublisher } from "../events/publisher/ticket-updated-publisher";
import { natsWrapper } from "../nats-wraper";


export const updateTicket = async (req: ExpressReq, res: Response, next: NextFunction) => {
    const data = req.body;

    const ticket = await ticketModel.findById(req.params.id);
    if (!ticket) {
        throw new NotFoundError();
    }
    if (req.user?.id != ticket.userId) {
        throw new UnAuthenticatedError()
    }

    ticket.set({
        title: data.title,
        price: data.price
    });
    await ticket.save();

    await new TicketUpdatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        price: ticket.price,
        title: ticket.title,
        userId: ticket.userId
    });

    res.status(200).json(ticket);
};