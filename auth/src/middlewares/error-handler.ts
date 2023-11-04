import { Request, Response, NextFunction } from "express";

import { customError } from "../utils/errors/custom-error";

export const errorHandler = (err: Error, req:Request, res:Response, next:NextFunction) => {
    if (err instanceof customError) {
        return res.status(err.statusCode).json({ errors: err.serializeErrors() });
    }

    res.status(500).json({
        errors: [{ message: "Something went wrong" }]
    });
}