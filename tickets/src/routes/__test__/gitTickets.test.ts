import requset from "supertest";
import { app } from "../../app";




const createTicket =  (title:string , price:number) => {
    return  requset(app).post("/api/ticket")
            .set("Cookie", signin())
            .send({
                title: title,
                price: price
            }).expect(201)
}

describe("git tickets", () => {
    it("should return all of ticket with status 200", async () => {
        await createTicket("ticket 1" , 10);
        await createTicket("ticket 2 " , 20);

        const response = await requset(app).get("/api/ticket")
            .send({}).expect(200);
        expect(response.body[0].title).toMatch("ticket 1");
        expect(response.body[0].price).toEqual(10);
        expect(response.body[1].title).toMatch("ticket 2");
        expect(response.body[1].price).toEqual(20);
    })
})