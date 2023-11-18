import { check } from "express-validator";
import { validatorMiddleware } from "@mkproject/common";


export const updateTicketValidation = [
    check("id").isMongoId()
        .withMessage("invalid id format"),
    check("title").notEmpty()
        .withMessage("title is required"),
    check("price").isFloat({ gt: 0 })
        .withMessage("price must be greather than 0"),
    validatorMiddleware
];