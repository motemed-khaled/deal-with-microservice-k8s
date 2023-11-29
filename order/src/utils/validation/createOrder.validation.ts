import { check } from "express-validator";
import { validatorMiddleware } from "@mkproject/common";


export const cretaeOrdersValidatin = [
    check("ticketId").isMongoId()
        .withMessage("invalid id format"),
    validatorMiddleware
];