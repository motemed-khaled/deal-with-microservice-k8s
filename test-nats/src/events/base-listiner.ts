import { Stan, Message } from "node-nats-streaming";
import { Subject } from "./subjects";

interface Event{
    subject: Subject,
    data:any
}

export abstract class Listiner<T extends Event> {
    abstract queueGroupName: string;
    abstract subject: T["subject"];
    abstract onMessage(data: T["data"], msg: Message): void;
    private client: Stan;
    protected ackWait = 5 * 1000;

    constructor(client:Stan) {
        this.client = client;
    }

    subscriptionOption() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);
    }

    listen(){
        const subescription = this.client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOption()
        );

        subescription.on("message", (msg: Message) => {
            console.log(`message recieved: ${this.subject}  / ${this.queueGroupName}`)

            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        })
    }

    parseMessage(msg: Message) {
        const data = msg.getData();

        return typeof data === "string" ? JSON.parse(data) : JSON.parse(data.toString("utf-8"));
    }
}