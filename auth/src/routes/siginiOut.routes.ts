import express from "express";

import { signOut } from "../controller/siginOut.controller";

export const router = express.Router();

router.post("/api/users/signout", signOut);