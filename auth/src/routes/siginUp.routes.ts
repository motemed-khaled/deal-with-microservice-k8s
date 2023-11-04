import express from "express";

import { signUp } from "../controller/siginUp.controller";
import { siginUpValidation } from "../utils/validation/siginUpValidation";

export const router = express.Router();

router.post("/api/users/signup", siginUpValidation,signUp);
