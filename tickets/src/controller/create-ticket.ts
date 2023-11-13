import { Request, Response, NextFunction } from "express";
import "express-async-errors";






export const createTicket = (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200)
}