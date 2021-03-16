//Hands-on Lab: Send Messages Between Distributed Applications
//Tutorial Link: https://aws.amazon.com/getting-started/hands-on/send-messages-distributed-applications/

import {expect} from "chai";
import "mocha";
import * as AWS from "aws-sdk";
import { SQS } from "aws-sdk";
AWS.config.update({region: 'us-east-1'});

describe("SQS", () => {
    const sqs: AWS.SQS = new AWS.SQS();

    it("should have 1 SQS queues. ", async () => {
        const OrdersQueue = await SQS
            .listQueues({QueueNamePrefix: "Orders"})
            .promise();
        expect(1, "Orders exist.").to.equal(OrdersQueue.QueueUrls!.length);
    });

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
    });
});