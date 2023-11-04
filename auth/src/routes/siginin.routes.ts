import express from "express";

import { signin } from "../controller/siginin.controller";
import { siginInValidation } from "../utils/validation/siginInValidation";

export const router = express.Router();

router.post("/api/users/signin",siginInValidation ,signin);