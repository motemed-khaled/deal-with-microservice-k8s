import { Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import "express-async-errors";

import { BadRequestError } from "../utils/errors/bad-request-error";
import { ExpressReq } from "../types/expressRequest";
import { UnAuthenticatedError } from "../utils/errors/unAuthenticated-error";



export const auth = (req: ExpressReq, res: Response, next: NextFunction) => {
        if (!req.session?.jwt) {
            throw new UnAuthenticatedError();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as {id:string , email:string};
        req.user = { id: payload.id, email: payload.email };
        return next();
    } catch (error) {
        throw new BadRequestError("invalid or expired token");
    }
}