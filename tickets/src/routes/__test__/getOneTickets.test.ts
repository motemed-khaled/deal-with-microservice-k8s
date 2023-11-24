import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";




describe("get one ticket", () => {
    it("should return 404 if ticket not found", async () => {
        await request(app).get("/api/ticket/jhjdfsdfsd")
            .set("Cookie", signin())
            .send({}).expect(400);
    });

    it("should return 400 if ticket id is not mongo id", async () => {
        const id = new mongoose.Types.ObjectId().toHexString();
        await request(app).get(`/api/ticket/${id}`)
            .set("Cookie", signin())
            .send({}).expect(404);
    });

    it("should return the ticket if it found", async () => {
        const response = await request(app).post("/api/ticket")
            .set("Cookie", signin())
            .send({
                title: "sfsfssdf",
                price: 10
            }).expect(201);
        
        const ticketResponse = await request(app).get(`/api/ticket/${response.body.id}`)
            .set("Cookie", signin())
            .send({}).expect(200);
        expect(ticketResponse.body.title).toEqual("sfsfssdf");
        expect(ticketResponse.body.price).toEqual(10);
    });
})