import {  Response, NextFunction } from "express";
import "express-async-errors";
import { ExpressReq,NotFoundError } from "@mkproject/common";

import { userModel } from "../model/user";


export const currentUser = async(req: ExpressReq, res: Response, next: NextFunction) => {
    const user = await userModel.findById(req.user?.id);

    if (!user) {
        throw new NotFoundError();
    }

    res.status(200).json(user);
};