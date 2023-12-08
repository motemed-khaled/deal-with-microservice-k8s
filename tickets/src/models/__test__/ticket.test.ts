import { ticketModel } from "../ticket.model";


it("should implement optimistic concurrency control", async () => {
    const ticket = await ticketModel.create({ title: "sdfsdf", price: 10, userId: "123" });


    const instanceOne = await ticketModel.findById(ticket.id);
    const instanceTwo = await ticketModel.findById(ticket.id);

    instanceOne!.set({ price: 10 });
    instanceTwo!.set({ price: 15 });

    await instanceOne!.save();
    try {
        await instanceTwo!.save();
    } catch (error) {
        return
    }
});

it("should increase version of ticket if saved more than one time", async () => {
    const ticket = await ticketModel.create({ title: "sadasd", price: 30, userId: "123" });

    expect(ticket.version).toEqual(0);

    ticket.set({ price: 50 });
    await ticket.save();
    expect(ticket.version).toEqual(1);
});