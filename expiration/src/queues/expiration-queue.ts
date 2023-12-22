import Queue from "bull";

import { ExpirationCompletePublisher } from "../event/publisher/expiration-complete-publisehr";
import { natsWrapper } from "../nats-wraper";

interface Payload {
  orderId: string;
}

export const ExpirationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

ExpirationQueue.process(async (job) => {

  new ExpirationCompletePublisher(natsWrapper.client).publish({ orderId: job.data.orderId });
});
