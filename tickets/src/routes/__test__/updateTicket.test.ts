import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { response } from "express";

describe("update ticket should", () => {
    it("return 404 if ticket not found", async () => {
        const id = new mongoose.Types.ObjectId().toHexString();
        await request(app).put(`/api/ticket/${id}`)
            .set("Cookie", signin())
            .send({
                title: "sdasdas",
                price: 20
            }).expect(404)
    });
    it("return 401 if user not signed in", async () => {
        const id = new mongoose.Types.ObjectId().toHexString();
        await request(app).put(`/api/ticket/${id}`)
            .send({
                title: "sdasdas",
                price: 20
            }).expect(401)
    });
    it("return 401 if user not own the text", async () => {
        const response = await request(app).post("/api/ticket")
            .set("Cookie", signin())
            .send({
                title: "sfsfssdf",
                price: 10
            });
        console.log(response.body.id)
        await request(app).put(`/api/ticket/${response.body.id}`)
            .set("Cookie", signin()).send({
                title: "sfsfssdf",
                price: 10000
            }).expect(401);
    });
    it("return 400 if user not provide avalid title or price", async () => {
        const id = new mongoose.Types.ObjectId().toHexString();
        await request(app).put(`/api/ticket/${id}`)
            .set("Cookie", signin()).send({
                title: "",
                price: 10000
            }).expect(400);
        
        await request(app).put(`/api/ticket/${id}`)
            .set("Cookie", signin()).send({
                title: "fsdfsdfsdf",
                price: -10000
            }).expect(400);
    });
    it("return 200 if ticket updated", async () => {
        const cookie = signin()
        const response = await request(app).post("/api/ticket")
            .set("Cookie", cookie)
            .send({
                title: "sfsfssdf",
                price: 10
            });
        
        await request(app).put(`/api/ticket/${response.body.id}`)
            .set("Cookie", cookie).send({
                title: "sfsfssdfsfsdfsfsd",
                price: 10000
            }).expect(200);
        
        const ticket = await request(app).get(`/api/ticket/${response.body.id}`)
            .set("Cookie", signin())
            .send({}).expect(200);
        
        expect(ticket.body.title).toMatch("sfsfssdfsfsdfsfsd");
        expect(ticket.body.price).toEqual(10000);
    });
    
});