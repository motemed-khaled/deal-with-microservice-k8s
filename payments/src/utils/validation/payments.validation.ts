import { check } from "express-validator";
import { validatorMiddleware } from "@mkproject/common";

export const createPaymentValidation = [
    check("token").notEmpty()
        .withMessage("token required"),
    check("orderId").isMongoId()
        .withMessage("invalid order id format"),
    validatorMiddleware
];