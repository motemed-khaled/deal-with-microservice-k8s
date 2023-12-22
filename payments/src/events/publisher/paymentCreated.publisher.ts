import { Subject, Publisher, paymentCreatedEvent } from "@mkproject/common";

export class PaymentCreatedPublisher extends Publisher<paymentCreatedEvent>{
    subject: Subject.paymentCreated = Subject.paymentCreated;
}