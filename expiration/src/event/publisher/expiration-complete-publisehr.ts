import { Publisher, Subject , ExpirationCompleteEvent } from "@mkproject/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subject.expirationComplete = Subject.expirationComplete;
}