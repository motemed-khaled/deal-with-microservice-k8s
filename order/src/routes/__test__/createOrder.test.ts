import Request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";
import { ticketModel } from "../../models/ticket.model";
import { OrderModel , OrderStatus } from "../../models/order.model";

describe("create order ", () => {
    it("should return status 401 if user not logged in", async () => {
        const ticketId = mongoose.Types.ObjectId;
        await Request(app)
            .post("/api/order")
            .send({ ticketId })
            .expect(401);
    });

    it("should return 400 if ticket id is invalid", async () => {
        await Request(app).post("/api/order")
            .set("Cookie", signin())
            .send({ ticketId: "123456" })
            .expect(400)
    });

    it("should return status 404 if ticket not found", async () => {
        const ticketId = new mongoose.Types.ObjectId().toHexString();
        await Request(app).post("/api/order")
            .set("Cookie", signin())
            .send({ ticketId })
            .expect(404);
    });

    it("should return status 400 if ticket already reserved", async () => {
        const ticket = await ticketModel.create({
            title: "ticket",
            price: 20
        });

        const order = await OrderModel.create({
            ticket : ticket.id,
            userId: "fsfsdfsd",
            expireAt: Date.now(),
            status: OrderStatus.Created
        });

        await Request(app).post("/api/order")
            .set("Cookie", signin())
            .send({ ticketId: ticket.id })
            .expect(400);
    });

    it("should reserve ticket if ticket exist and not reserved", async () => {
        const ticket = await ticketModel.create({
            title: "ticket",
            price: 30
        });

        
         const response = await Request(app).post("/api/order")
            .set("Cookie", signin())
            .send({ ticketId: ticket.id })
            .expect(201);
        expect(response.body.ticket.id).toMatch(ticket.id);
    });

    it.todo("publish event order created")
});
