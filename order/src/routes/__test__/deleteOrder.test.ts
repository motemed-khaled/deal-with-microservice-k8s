import request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";
import { OrderModel , OrderStatus } from "../../models/order.model";
import { ticketModel } from "../../models/ticket.model";
import { natsWrapper } from "../../nats-wraper";

describe("delete order", () => {
    it("should return 401 if user not signed in", async () => {
        const orderId = new mongoose.Types.ObjectId().toHexString();

        await request(app).delete(`/api/order/${orderId}`)
            .send().expect(401);
    });

    it("should return 400 if user enter invalid id", async () => {

        await request(app).delete("/api/order/54545456")
            .set("Cookie", signin())
            .expect(400);
    });

    it("should return 404 if ticket not found", async () => {
        const orderId = new mongoose.Types.ObjectId().toHexString();

        await request(app).delete(`/api/order/${orderId}`)
            .set("Cookie", signin())
            .send().expect(404);
    });

    it("should return 401 if user not owner the order", async () => {
        const ticket = await ticketModel.create({ title: "sadsad", price: 123 });

        const userOne = signin();
        const userTwo = signin();
        
        const order = await request(app).post("/api/order")
            .set("Cookie", userOne)
            .send({ ticketId: ticket.id }).expect(201);
        
        await request(app).delete(`/api/order/${order.body.id}`)
            .set("Cookie", userTwo)
            .send().expect(401);
    });

    it("should return 204 if order deleted", async () => {
        const ticket = await ticketModel.create({
            title: "sadsad",
            price: 123,
        });

        const userOne = signin();

        const order = await request(app)
            .post("/api/order")
            .set("Cookie", userOne)
            .send({ ticketId: ticket.id })
            .expect(201);
        
        const response = await request(app)
            .delete(`/api/order/${order.body.id}`)
            .set("Cookie", userOne)
            .send()
            .expect(204);
    });

    it("should publish event order cancelled", async () => {
                const ticket = await ticketModel.create({
                  title: "sadsad",
                  price: 123,
                });

                const userOne = signin();

                const order = await request(app)
                  .post("/api/order")
                  .set("Cookie", userOne)
                  .send({ ticketId: ticket.id })
                  .expect(201);

                const response = await request(app)
                  .delete(`/api/order/${order.body.id}`)
                  .set("Cookie", userOne)
                  .send()
            .expect(204);
        expect(natsWrapper.client.publish).toHaveBeenCalled();
    })
})