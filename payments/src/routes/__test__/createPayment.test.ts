import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { orderModel } from "../../models/order.model";
import { OrderStatus } from "@mkproject/common";
import { stripe } from "../../stripe";

jest.mock("../../stripe");

describe("create payment should be", () => {
  it("return 401 if user not logged in", async () => {
    const orderId = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .post("/api/payments")
      .send({ orderId, token: "fds" })
      .expect(401);
  });

  it("return 400 for invalid input order id", async () => {
    await request(app)
      .post("/api/payments")
      .set("Cookie", signin())
      .send({ orderId: "fdfs", token: "fds" })
      .expect(400);
  });

  it("return 400 for invalid input token", async () => {
    const orderId = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .post("/api/payments")
      .set("Cookie", signin())
      .send({ orderId })
      .expect(400);
  });

  it("return 404 if order not found", async () => {
    const orderId = new mongoose.Types.ObjectId().toHexString();

    await request(app)
      .post("/api/payments")
      .set("Cookie", signin())
      .send({ orderId, token: "fds" })
      .expect(404);
  });

  it("return 401 if user not owner for this order", async () => {
    const orderId = new mongoose.Types.ObjectId().toHexString();
    const order = await orderModel.create({
      _id: orderId,
      userId: new mongoose.Types.ObjectId().toHexString(),
      status: OrderStatus.Created,
      price: 500,
      version: 0,
    });

    await request(app)
      .post("/api/payments")
      .set("Cookie", signin())
      .send({ orderId, token: "fds" })
      .expect(401);
  });

  it("return 400 if order status equal cancelled", async () => {
    const orderId = new mongoose.Types.ObjectId().toHexString();
    const userId = new mongoose.Types.ObjectId().toHexString();
    const userOne = signin(userId);
    const order = await orderModel.create({
      _id: orderId,
      userId: userId,
      status: OrderStatus.Cancelled,
      price: 500,
      version: 0,
    });

    await request(app)
      .post("/api/payments")
      .set("Cookie", signin(userId))
      .send({ orderId, token: "fdsd" })
      .expect(400);
  });


  // it("return 204 for with valid input", async () => {
  //   const orderId = new mongoose.Types.ObjectId().toHexString();
  //   const userId = new mongoose.Types.ObjectId().toHexString();
  //   const userOne = signin(userId);
  //   const order = await orderModel.create({
  //     _id: orderId,
  //     userId: userId,
  //     status: OrderStatus.Created,
  //     price: 500,
  //     version: 0,
  //   });

  //   await request(app)
  //     .post("/api/payments")
  //     .set("Cookie", signin(userId))
  //     .send({ orderId, token: "tok_visa" })
  //     .expect(201);

  //   const chargerOption = (stripe.charges.create as jest.Mock).mock.calls[0][0];

  //   expect(chargerOption.currency).toMatch("usd");
  //   expect(chargerOption.amount).toEqual(order.price * 100);
  //   expect(chargerOption.source).toMatch("tok_visa");
  // });
});
