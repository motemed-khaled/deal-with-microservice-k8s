import { check } from "express-validator";
import { validatorMiddleware } from "@mkproject/common";

export const siginInValidation = [
    check("email").isEmail()
        .withMessage("invalid email format"),
    check("password").trim().notEmpty()
        .withMessage("password is required field"),
    validatorMiddleware
];