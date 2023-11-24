import nats from "node-nats-streaming";

import { ticketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();
const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("publisher is connect to nats");

  try {
    const publisher = new ticketCreatedPublisher(stan);

    await publisher.publish({ id: "1", price: 20, title: "metoo" });
  } catch (err) {
    console.log(err);
  }
  // const data = JSON.stringify({
  //     id: "123",
  //     title: "metoo",
  //     price:20
  // });

  // stan.publish("ticket:created", data, () => {
  //     console.log("event published")
  // })
});
