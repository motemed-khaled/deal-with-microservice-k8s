import { Application } from "express";
import "express-async-errors";

import { NotFoundError } from "../utils/errors/notFound-error";
import { router as loggedUserRoutes } from "./loggedUser.routes";
import { router as siginUPRoutes } from "./siginUp.routes";
import { router as siginOutRoutes } from "./siginiOut.routes";
import { router as siginRoutes } from "./siginin.routes";

export const mountRoutes = (app: Application) => {
    app.use(loggedUserRoutes);
    app.use(siginUPRoutes);
    app.use(siginOutRoutes);
    app.use(siginRoutes);


    app.all("*", async (req, res) => {
        throw new NotFoundError();
    });
}