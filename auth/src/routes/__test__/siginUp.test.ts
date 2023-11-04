import requset from "supertest";
import { app } from "../../app";


describe("signup", () => {
    it("should return 201 in successful way ", async () => {
        await requset(app).post("/api/users/signup").send({
            email: "m@m.com",
            password: "1234"
        }).expect(201);
    });

    it("should return 400 with invalid email ", async () => {
        await requset(app).post("/api/users/signup").send({
            email: "m@m",
            password: "1234"
        }).expect(400);
    });
    
    it("should return 400 with invalid password ", async () => {
        await requset(app).post("/api/users/signup").send({
            email: "m@m.com",
            password: "123"
        }).expect(400);
    });
    
    it("should return 400 with missing email or password ", async () => {
        await requset(app).post("/api/users/signup").send({ email: "m@m.com" }).expect(400);
        await requset(app).post("/api/users/signup").send({ password: "12345" }).expect(400);
    });

    it("should disallowed dublicated email", async () => {
        await requset(app).post("/api/users/signup")
            .send({ email: "m@m.com", password: "password" })
            .expect(201);
        await requset(app).post("/api/users/signup")
            .send({ email: "m@m.com", password: "password" })
            .expect(400);
    });

    it("should sets acookie after successful sginup", async () => {
        const response = await requset(app).post("/api/users/signup")
            .send({ email: "m@m.com", password: "password" })
            .expect(201);
        
        expect(response.get("Set-Cookie")).toBeDefined();
    })
});
