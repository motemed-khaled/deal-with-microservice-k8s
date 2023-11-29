import request from "supertest";
import { app } from "../../app";

import { ticketModel } from "../../models/ticket.model";
import { OrderModel } from "../../models/order.model";

const createTicket = async () => {
    const ticket = await ticketModel.create({
        title: "dfdf",
        price: 20
    })
    return ticket;
}

describe("get orders", () => {
  it("should retun orders for specific user", async () => {
      
    const ticketOne = await createTicket();
    const ticketTwo = await createTicket();
    const ticketThree = await createTicket();
      

    const userOne = global.signin();
    const userTwo = global.signin();

    await request(app)
      .post("/api/order")
      .set("Cookie", userOne)
      .send({ ticketId: ticketOne.id })
      .expect(201);

    const { body: orderOne } = await request(app)
      .post("/api/order")
      .set("Cookie", userTwo)
      .send({ ticketId: ticketTwo.id })
      .expect(201);
    const { body: orderTwo } = await request(app)
      .post("/api/order")
      .set("Cookie", userTwo)
      .send({ ticketId: ticketThree.id })
      .expect(201);

    const response = await request(app)
      .get("/api/order/getorders")
      .set("Cookie", userTwo)
      .expect(200);

    
    expect(response.body.data.length).toEqual(2);
    expect(response.body.data[0].id).toEqual(orderOne.id);
    expect(response.body.data[1].id).toEqual(orderTwo.id);
    expect(response.body.data[0].ticket.id).toEqual(ticketTwo.id);
    expect(response.body.data[1].ticket.id).toEqual(ticketThree.id);
  });
});