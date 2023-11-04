import { Request, Response, NextFunction } from "express";
import "express-async-errors";

import { userModel } from "../model/user";
import { NotFoundError } from "../utils/errors/notFound-error";
import { BadRequestError } from "../utils/errors/bad-request-error";
import { generateToken } from "../utils/generateToken";
import { UnAuthenticatedError } from "../utils/errors/unAuthenticated-error";

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