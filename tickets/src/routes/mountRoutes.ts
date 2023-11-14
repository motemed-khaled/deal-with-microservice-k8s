import { Application } from "express";
import { NotFoundError } from "@mkproject/common";

import { router as createTicketRoutes } from "./createTickets.routes";
import { router as getticketRoutes } from "./getOneTicket.routes";


export const mountRoutes = (app: Application) => {
    app.use(createTicketRoutes);
    app.use(getticketRoutes);


    app.use("*", (req , res) => {
        throw new NotFoundError();
    })
}