import {expect} from "chai";
import "mocha";
import * as AWS from "aws-sdk";
import { SQS } from "aws-sdk";

describe("SQS", () => {
    const sqs: AWS.SQS = new AWS.SQS();

    it("should have 1 SQS queues. ", async () => {
        const OrdersQueue = await sqs
            .listQueues({QueueNamePrefix: "Orders"})
            .promise();
        expect(1, "Orders exist.").to.equal(OrdersQueue.QueueUrls!.length);
    })

    it("should send a message", async () => {
        const OrdersMessage = {
            MessageBody: {Type: String,
                Value: "1 x Widget @ $29.99 USD \n 2 x Widget Cables @ $4.99"
            },
            MeassgeAttributes: {Type: String, 
                Name: "Order-Type", 
                Value: "Online",
            }
        }
    })
});