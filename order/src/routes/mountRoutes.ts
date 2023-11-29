import { Application } from "express";
import { NotFoundError } from "@mkproject/common";

import { router as getOrdersRoutes } from "./getOrders.routes";
import { router as createOrderRoutes } from "./createOrder.routes";
import { router as getOrderRoutes } from "./getOrder.routes";
import { router as deleteOrderRoutes } from "./deleteOrder.routes";


export const mountRoutes = (app: Application) => {

    app.use(getOrdersRoutes);
    app.use(createOrderRoutes);
    app.use(getOrderRoutes);
    app.use(deleteOrderRoutes);

    app.use("*", (req , res) => {
        throw new NotFoundError();
    })
}