import {  Response, NextFunction } from "express";
import "express-async-errors";
import { ExpressReq, NotFoundError } from "@mkproject/common";

import { ticketModel } from "../models/ticket.model";

export const getticket = async (req: ExpressReq, res: Response, next: NextFunction)=>{
    const ticket = await ticketModel.findById(req.params.id);
    if (!ticket) {
        throw new NotFoundError();
    }
    res.status(200).json(ticket);
}