import request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";
import { ticketModel } from "../../models/ticket.model";

describe("get order", () => {
    it("should be return 401 if user not singed in ", async () => {
        const orderId = new mongoose.Types.ObjectId().toHexString();
        
        await request(app).get(`/api/order/${orderId}`)
            .send().expect(401);
    });

    it("should return 400 if user enter invalid id", async () => {
        await request(app).get("/api/order/123545454")
            .set("Cookie", signin())
            .send().expect(400);
    });

    it("should return 404 if order not found", async () => {
        const orderId = new mongoose.Types.ObjectId().toHexString();

        await request(app).get(`/api/order/${orderId}`)
            .set("Cookie", signin())
            .send()
            .expect(404);
    });

    it("should return 401 if user not owner for this ticket", async () => {
        const userOne = signin();
        const userTwo = signin();

        const ticket = await ticketModel.create({ title: "fsdsd", price: 5445 });

        const response = await request(app).post("/api/order")
            .set("Cookie", userOne)
            .send({ ticketId: ticket.id })
            .expect(201);

        await request(app)
            .get(`/api/order/${response.body.id}`)
            .set("Cookie", userTwo)
            .send().expect(401);
        
    });

    it("should return 200 if get order suuccesfuly", async () => {
        const user = signin();

        const ticket = await ticketModel.create({ title: "ticket1", price: 123 });

        const order = await request(app).post("/api/order")
            .set("Cookie", user)
            .send({ ticketId: ticket.id })
            .expect(201)
        
        
        const response = await request(app).get(`/api/order/${order.body.id}`)
            .set("Cookie", user)
            .send().expect(200);
        
        expect(response.body.data.ticket.title).toMatch("ticket1");
        expect(response.body.data.ticket.price).toEqual(123);
    });
});