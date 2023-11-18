import request from "supertest";
import { app } from "../../app";
import { ticketModel } from "../../models/ticket.model";

describe("create ticket", () => {
    it("should be return not retunr 404", async () => {
        const response = await request(app).post("/api/ticket")
            .send({});
        expect(response.status).not.toEqual(404);
    });

    it("should return 401 if user not signed in ", async () => {
        await request(app).post("/api/ticket")
            .send({}).expect(401);
    });

    it("should return not equal 401 if user signed in", async () => {
        const response = await request(app).post("/api/ticket")
            .set("Cookie" , signin())
            .send({});
        expect(response.status).not.toEqual(401);
    });

    it("should return status 400 if invalid title is provide", async () => {
        await request(app).post("/api/ticket")
            .set("Cookie", signin())
            .send({
                title: "",
                price: 10
            })
            .expect(400);
        
        await request(app).post("/api/ticket")
            .set("Cookie", signin())
            .send({
                price: 10
            })
            .expect(400);
    });

    it("should return status 400 if invalid price is provide", async () => {
        await request(app).post("/api/ticket")
            .set("Cookie", signin())
            .send({
                title: "fwewewer",
                price: -10
            })
            .expect(400);
        
        await request(app).post("/api/ticket")
            .set("Cookie", signin())
            .send({
                title: "sfsfssdf"
            })
            .expect(400);
    });

    it("should create tickets with valid value", async () => {
        let tickets = await ticketModel.find({});
        expect(tickets.length).toEqual(0);

        await request(app).post("/api/ticket")
            .set("Cookie", signin())
            .send({
                title: "sfsfssdf",
                price: 10
            }).expect(201)
        tickets = await ticketModel.find({});
        expect(tickets.length).toEqual(1);
        expect(tickets[0].title).toEqual("sfsfssdf")
        expect(tickets[0].price).toEqual(10);
    })
});