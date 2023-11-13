import request from "supertest";
import { app } from "../../app";


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
            .send({});
        expect(response.status).not.toEqual(401);
    });
});