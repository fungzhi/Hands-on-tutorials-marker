//Hands-on Lab: Send Messages Between Distributed Applications
//Tutorial Link: https://aws.amazon.com/getting-started/hands-on/send-messages-distributed-applications/

import {expect} from "chai";
import "mocha";
import * as AWS from "aws-sdk";
import { SQS } from "aws-sdk";
AWS.config.update({region: 'us-east-1'});

describe("Send Messages Between Distributed Applications", () => {
    const sqs: AWS.SQS = new AWS.SQS();

    // Step 1: Create a new queue with name "Orders"
    it("should have 1 SQS queue: Orders. ", async () => {
        const OrdersQueue = await sqs
            .listQueues({QueueNamePrefix: "Orders"})
            .promise();
        expect(1, "Orders queue exist.").to.equal(OrdersQueue.QueueUrls!.length);
    }); // 1 mark //

    // Step 2: Send message to the Queue in "Orders" 
    it("should send a message", async () => {
        const OrdersMessage = await sqs
            .sendMessage(
                {
                    MessageBody:"1 x Widget @ $29.99 USD \n 2 x Widget Cables @ $4.99",
                    QueueUrl: "Orders",
                    MessageAttributes:{
                        "Order-Type":{
                            DataType:"Order-Type",
                            StringValue:"Online"
                        }
                    }
                }
            )
        expect(OrdersMessage,"Send message to Orders queue exist.").to.be.exist;
    }); // 1 mark //
});