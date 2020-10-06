// Hands-on Lab: Filter-Messages-Published-to-Topics//
// tutorial link: https://aws.amazon.com/tw/getting-started/hands-on/filter-messages-published-to-topics/?nc1=h_ls//

import { expect } from "chai";
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import "mocha";
import * as AWS from "aws-sdk";
import { SQS, SNS } from "aws-sdk";

describe("SQS and SNS", () => {
    const sqs: AWS.SQS = new AWS.SQS();
    const sns: AWS.SNS = new AWS.SNS();

    it("should have 3 SQS queues. ", async () => {
        const AllQueue = await sqs
          .listQueues({ QueueNamePrefix: "All-Quotes" })
          .promise();
        const LifeQueue = await sqs
          .listQueues({ QueueNamePrefix: "Life-Insurance-Quotes" })
          .promise();
        const VehicleQueue = await sqs
          .listQueues({ QueueNamePrefix: "Vehicle-Insurance-Quotes" })
          .promise();
        expect(1, "All-Quotes exist.").to.equal(AllQueue.QueueUrls!.length);
        expect(1, "Life-Insurance-Quotes exist.").to.equal(LifeQueue.QueueUrls!.length);
        expect(1, "Vehicle-Insurance-Quotes exist.").to.equal(VehicleQueue.QueueUrls!.length);
    });

    it("should have Insurance-Quote-Reqests with 3 queues subscription. ", async () => {
        const topics: SNS.Types.ListTopicsResponse = await sns
          .listTopics()
          .promise();
    
        const TopicArn = topics!.Topics!.find((c) =>
          c.TopicArn!.endsWith("Insurance-Quote-Reqests")
        )!.TopicArn;
        expect(TopicArn, "Insurance-Quote-Reqests exists.").to.be.exist;
    
        const subscriptions = await sns
          .listSubscriptionsByTopic({ TopicArn: TopicArn! })
          .promise();
        
        const AllQueueSubscription = subscriptions!.Subscriptions!.find(
          (c) => c.Protocol === "sqs" && c.Endpoint!.endsWith("All-Quotes"));
        const LifeQueueSubscription = subscriptions!.Subscriptions!.find(
          (c) => c.Protocol === "sqs" && c.Endpoint!.endsWith("Life-Insurance-Quotes"));
        const VehicleQueueSubscription = subscriptions!.Subscriptions!.find(
          (c) => c.Protocol === "sqs" && c.Endpoint!.endsWith("Vehicle-Insurance-Quotes"));
    
        expect(AllQueueSubscription, "All-Quotes Subscription exists.").to.be.exist;
        expect(LifeQueueSubscription, "Life-Insurance-Quotes Subscription exists.").to.be.exist;
        expect(VehicleQueueSubscription, "Vehicle-Insurance-Quotes Subscription exists.").to.be.exist;

        const expextedFilterPolicy1 = {SubscriptionFilterPolicy: {"insurance_type": ["car", "boat"]}};
        const expextedFilterPolicy2 = {SubscriptionFilterPolicy: {"insurance_type": ["life"]}};

        expect(VehicleQueueSubscription, "Filter Policy(1) settings.").to.containSubset(expextedFilterPolicy1);
        expect(VehicleQueueSubscription, "Filter Policy(2) settings.").to.containSubset(expextedFilterPolicy2);
    });

    it("should publish 2 messages to Insurance-Quote-Reqests. ", async () =>{
        const expextedPublishMessage1 = {
            MessageDetails: {Suject: "Insurance Quote Request #1"},
            MessageBody: {MessageStructure: "Identical payload for all delivery protocols. ",
                MessageBodyToSendToTheEndpoint: "2017 Volvo S60, Montreal",
            },
            MeassgeAttributes: {Type: String, 
                Name: "insurance_type", 
                Value: "car",
            },
        };

        const expextedPublishMessage2 = {
            MessageDetails: {Suject: "Insurance Quote Request #2"},
            MessageBody: {MessageStructure: "Identical payload for all delivery protocols. ",
                MessageBodyToSendToTheEndpoint: "Townhouse, 1500 sq ft, Toronto",
            },
            MeassgeAttributes: {Type: String, 
                Name: "insurance_type", 
                Value: "life",
            },
        };
    });
});