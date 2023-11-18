import { Response, NextFunction } from "express";
import { ExpressReq, NotFoundError, UnAuthenticatedError } from "@mkproject/common";

import { ticketModel } from "../models/ticket.model";


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

    res.status(200).json(ticket);
};