import { Application } from "express";
import { NotFoundError } from "@mkproject/common";

import { router as createTicketRoutes } from "./createTickets.routes";


export const mountRoutes = (app: Application) => {
    app.use(createTicketRoutes);


    app.use("*", (req , res) => {
        throw new NotFoundError();
    })
}