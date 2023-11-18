import { Response, Request, NextFunction } from "express";
import "express-async-errors";

import { ticketModel } from "../models/ticket.model";


export const gitTicket = async (req: Request, res: Response, next: NextFunction) => {
    const tickets = await ticketModel.find();
    res.status(200).json(tickets);
};