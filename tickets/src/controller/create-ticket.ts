import {  Response, NextFunction } from "express";
import "express-async-errors";
import { ExpressReq, Publisher } from "@mkproject/common";

import { ticketModel } from "../models/ticket.model";
import { TicketCraetedPublisher } from "../events/publisher/ticket-created-publisher";
import { natsWrapper } from "../nats-wraper";



export const createTicket = async(req: ExpressReq, res: Response, next: NextFunction) => {
    const ticket = await ticketModel.create({
        title: req.body.title,
        price: req.body.price,
        userId: req.user?.id
    });

    await new TicketCraetedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        price: ticket.price,
        title: ticket.title,
        userId: ticket.userId,
        version:ticket.version
    });

    res.status(201).json(ticket);
}