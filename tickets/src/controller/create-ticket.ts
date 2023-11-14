import {  Response, NextFunction } from "express";
import "express-async-errors";
import { ExpressReq } from "@mkproject/common";

import { ticketModel } from "../models/ticket.model";






export const createTicket = async(req: ExpressReq, res: Response, next: NextFunction) => {
    const ticket = await ticketModel.create({
        title: req.body.title,
        price: req.body.price,
        userId: req.user?.id
    });

    res.status(201).json(ticket);
}