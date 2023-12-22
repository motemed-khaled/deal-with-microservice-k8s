import { Application } from "express";
import { NotFoundError } from "@mkproject/common";

import { router as createPaymentRoutes } from "./createPayment.routes";

export const mountRoutes = (app: Application) => {
    app.use(createPaymentRoutes);


    app.all("*", async (req, res) => {
        throw new NotFoundError();
    });
}