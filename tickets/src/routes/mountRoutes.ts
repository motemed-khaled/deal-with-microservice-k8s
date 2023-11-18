import { Application } from "express";
import { NotFoundError } from "@mkproject/common";

import { router as createTicketRoutes } from "./createTickets.routes";
import { router as getticketRoutes } from "./getOneTicket.routes";
import { router as gitTicketsRouter } from "./gitTicket.routes";
import { router as updateTicketsRouter } from "./updateTickets.routes";


export const mountRoutes = (app: Application) => {
    app.use(createTicketRoutes);
    app.use(getticketRoutes);
    app.use(gitTicketsRouter);
    app.use(updateTicketsRouter);


    app.use("*", (req , res) => {
        throw new NotFoundError();
    })
}