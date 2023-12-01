import { check } from "express-validator";
import { validatorMiddleware } from "@mkproject/common";


export const deleteOrderValidation = [
    check("id").isMongoId()
        .withMessage("invalid order id format"),
    validatorMiddleware
];