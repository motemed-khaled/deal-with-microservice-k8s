import { check } from "express-validator";
import { validatorMiddleware } from "@mkproject/common";

export const getticketsValidation = [
    check("id").isMongoId()
        .withMessage("invalid id format"),
    validatorMiddleware
];