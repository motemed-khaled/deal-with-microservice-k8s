import { Request, Response, NextFunction } from "express";

export const signOut = (req: Request, res: Response, next: NextFunction) => {
    req.session = null;
    res.status(200).send({});
};