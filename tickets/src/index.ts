import { randomBytes } from "crypto";

import { dbConnection } from "./config/database-connection";
import { app } from "./app";
import { natsWrapper } from "./nats-wraper";
import { customError } from "@mkproject/common";

const start = async () => {
  // check env file

  if (!process.env.JWT_KEY) {
    throw new Error("jwt key must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("mongo uri must be defined");
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

    //connect to database
    await dbConnection();
  } catch (err) {
    throw new Error("error from mongo connection or nats connection");
  }

  app.listen(3000, () => {
    console.log("app listen in port 3000");
  });
};

start();
