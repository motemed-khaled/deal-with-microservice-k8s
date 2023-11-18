import nats from "node-nats-streaming";
import { randomBytes } from "crypto";

import { TicketingListiner } from "./events/ticket-listiner";

console.clear()

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
    url: "http://localhost:4222"
});

stan.on("connect", () => {
    console.log("listiner connected to nats");

    stan.on("close", () => {
        console.log("nats connection closed");
        process.exit();
    })

    new TicketingListiner(stan).listen();

});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());




