import { Subject , Publisher , OrderCreatedEvent } from "@mkproject/common";


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subject.orderCreated = Subject.orderCreated;
}