import {  Response, NextFunction } from "express";
import "express-async-errors";

import { userModel } from "../model/user";
import { ExpressReq } from "../types/expressRequest";
import { NotFoundError } from "../utils/errors/notFound-error";


export const currentUser = async(req: ExpressReq, res: Response, next: NextFunction) => {
    const user = await userModel.findById(req.user?.id);

    if (!user) {
        throw new NotFoundError();
    }

    res.status(200).json(user);
};