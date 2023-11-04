import { validationResult } from "express-validator";
import { Request , Response , NextFunction } from "express";

import { RequestValidationError } from "../utils/errors/request-validation-error";

export const validatorMiddleware = (req:Request, res:Response , next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
    next();
}