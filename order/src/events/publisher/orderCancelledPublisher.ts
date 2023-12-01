import { Publisher, Subject, OrderCancelledEvent } from "@mkproject/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subject.orderCancelled = Subject.orderCancelled;
}