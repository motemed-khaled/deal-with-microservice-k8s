import request from "supertest";
import { app } from "../../app";


describe("logged user should be", () => {
    it("response with details for logged user", async () => {
        const cookie = await signin();
        
        const response = await request(app).get("/api/users/currentuser")
            .set("Cookie", cookie)
            .send()
            .expect(200);
        expect(response.body.email).toEqual("m@m.com");
    })
    it("get 401 if no user sigin or sginup ", async () => {
        await request(app).get("/api/users/currentuser")
            .send()
            .expect(401);
    });
});