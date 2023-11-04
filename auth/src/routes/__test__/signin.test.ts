import request from "supertest";
import { app } from "../../app";


describe("signin should be", () => {
    it("fail when an email dosent exist", async () => {
        await request(app).post("/api/users/signin")
            .send({
                email: "test@test.com",
                password: "123456"
            }).expect(404)
    });

    it("should fail when incorrect password", async () => {
        await request(app).post("/api/users/signup")
            .send({
                email: "test@test.com",
                password: "123456"
            }).expect(201);
        await request(app).post("/api/users/signin")
            .send({
                email: "test@test.com",
                password: "1234"
            }).expect(401);
    });

    it("response with return cookie when sginin successfully", async()=> {
        await request(app).post("/api/users/signup")
            .send({
                email: "test@test.com",
                password: "123456"
            }).expect(201);
        const response = await request(app).post("/api/users/signin")
            .send({
                email: "test@test.com",
                password: "123456"
            }).expect(200);
        
        expect(response.get("Set-Cookie")).toBeDefined();
    })
});