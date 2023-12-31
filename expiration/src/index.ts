import { natsWrapper } from "./nats-wraper";
import { OrderCreatedListiner } from "./event/listiner/order-created-listiner";
const start = async () => {
  // check env file

  if (!process.env.REDIS_HOST) {
    throw new Error("redis host must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("nats cluster id must be defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("nats cluster id must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("nats url must be defined");
  }

  try {
    // connect to nats server
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on("close", () => {
      console.log("nats connection close ");
      process.exit();
    });

    process.on("SIGINT", () => {
      natsWrapper.client.close();
    });

    process.on("SIGTERM", () => {
      natsWrapper.client.close();
    });

    new OrderCreatedListiner(natsWrapper.client).listen();
  } catch (err) {
    throw new Error("error from nats connection");
  }

};

start();
