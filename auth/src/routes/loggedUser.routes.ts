import express from "express";

import { currentUser } from "../controller/loggedUser.controller";
import { auth as protect } from "../middlewares/auth";

export const router = express.Router();

router.get("/api/users/currentuser", protect ,currentUser);
