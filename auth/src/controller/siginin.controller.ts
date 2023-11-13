import { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { NotFoundError,BadRequestError,UnAuthenticatedError } from "@mkproject/common";

import { userModel } from "../model/user";
import { generateToken } from "../utils/generateToken";

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        throw new NotFoundError();
    }

    if (!(await user.validatePassword(password))) {
        throw new UnAuthenticatedError();
    }

     generateToken({ id: user._id, email: user.email } , req);

    res.status(200).json(user);
};