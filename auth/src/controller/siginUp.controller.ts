import { Request, Response, NextFunction } from "express";
import "express-async-errors";

import { userModel } from "../model/user";
import { BadRequestError } from "../utils/errors/bad-request-error";
import { generateToken } from "../utils/generateToken";
export const signUp = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    const existUser = await userModel.findOne({ email });
    if (existUser) {
        throw new BadRequestError("Email is already used");
    }

    const user = await userModel.create({ email, password });

    generateToken({ id: user._id, email: user.email }, req);
    
    res.status(201).json(user)
};