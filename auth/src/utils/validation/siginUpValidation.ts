import { check } from "express-validator";

import { validatorMiddleware } from "../../middlewares/validationError.middleware";

export const siginUpValidation = [
    check("email").isEmail()
        .withMessage("invalid email format"),
    check("password").trim().isLength({ min: 4  , max:20})
        .withMessage("password must between 4 to 20 charchters"),
    validatorMiddleware
];