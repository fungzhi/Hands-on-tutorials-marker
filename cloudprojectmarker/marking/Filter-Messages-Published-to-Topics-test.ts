// Hands-on Lab: Filter-Messages-Published-to-Topics//
// tutorial link: https://aws.amazon.com/tw/getting-started/hands-on/filter-messages-published-to-topics/?nc1=h_ls//

import { expect } from "chai";
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import "mocha";
import * as AWS from "aws-sdk";
import { SQS, SNS } from "aws-sdk";

describe("Filter Messages Published to Topics", () => {
  const sqs: AWS.SQS = new AWS.SQS();
  const sns: AWS.SNS = new AWS.SNS();


  //Part 1: Create a new topic with name "Insurance-Quote-Reqests" (total 1 mark) //
  it("should have 1 SNS topic: Insurance-Quote-Reqests. ", async () => {
    const topics: SNS.Types.ListTopicsResponse = await sns
      .listTopics()
      .promise();

    const TopicArn = topics!.Topics!.find((c) =>
      c.TopicArn!.endsWith("Insurance-Quote-Reqests")
    )!.TopicArn;
    expect(TopicArn, "Insurance-Quote-Reqests exists.").to.be.exist;
  }); // 1 mark //


  //Part 2: Create 3 queues with name "All-Quotes", "Life-Insurance-Quotes" and "Vehicle-Insurance-Quotes" (total 3 marks) //
  it("should have 1 SQS queues: All-Quotes. ", async () => {
    const AllQueue = await sqs
      .listQueues({ QueueNamePrefix: "All-Quotes" })
      .promise();
    expect(1, "All-Quotes exist.").to.equal(AllQueue.QueueUrls!.length);
  }); // 1 mark //

  it("should have 1 SQS queues: Life-Insurance-Quotes. ", async () => {
    const LifeQueue = await sqs
      .listQueues({ QueueNamePrefix: "Life-Insurance-Quotes" })
      .promise();
    expect(1, "Life-Insurance-Quotes exist.").to.equal(
      LifeQueue.QueueUrls!.length
    );
  }); // 1 mark //

  it("should have 1 SQS queues: Vehicle-Insurance-Quotes. ", async () => {
    const VehicleQueue = await sqs
      .listQueues({ QueueNamePrefix: "Vehicle-Insurance-Quotes" })
      .promise();
    expect(1, "Vehicle-Insurance-Quotes exist.").to.equal(
      VehicleQueue.QueueUrls!.length
    );
  }); // 1 mark //


  //Part 3: Subscribe 3 queues to the topic "Insurance-Quote-Reqests" (total 1 mark) //
  it("should have Insurance-Quote-Reqests with 3 queues subscription. ", async () => {
    const topics: SNS.Types.ListTopicsResponse = await sns
      .listTopics()
      .promise();

    const TopicArn = topics!.Topics!.find((c) =>
      c.TopicArn!.endsWith("Insurance-Quote-Reqests")
    )!.TopicArn;

    const subscriptions = await sns
      .listSubscriptionsByTopic({ TopicArn: TopicArn! })
      .promise();

    const AllQueueSubscription = subscriptions!.Subscriptions!.find(
      (c) => c.Protocol === "sqs" && c.Endpoint!.endsWith("All-Quotes")
    );
    const LifeQueueSubscription = subscriptions!.Subscriptions!.find(
      (c) =>
        c.Protocol === "sqs" && c.Endpoint!.endsWith("Life-Insurance-Quotes")
    );
    const VehicleQueueSubscription = subscriptions!.Subscriptions!.find(
      (c) =>
        c.Protocol === "sqs" && c.Endpoint!.endsWith("Vehicle-Insurance-Quotes")
    );

    expect(AllQueueSubscription, "All-Quotes Subscription exists.").to.be.exist;
    expect(LifeQueueSubscription, "Life-Insurance-Quotes Subscription exists.")
      .to.be.exist;
    expect(
      VehicleQueueSubscription,
      "Vehicle-Insurance-Quotes Subscription exists."
    ).to.be.exist;
  }); // 1 mark //
  
  //Part 4: Add filter policy to sqs query (total 1 mark) //
  it("should have 1 filter policy added to Life-Insurance-Quotes. ", async () => {
    const topics: SNS.Types.ListTopicsResponse = await sns
      .listTopics()
      .promise();

    const TopicArn = topics!.Topics!.find((c) =>
      c.TopicArn!.endsWith("Insurance-Quote-Reqests")
    )!.TopicArn;
    
    
    
  });
  
  it("should have 1 filter policy added to Vehicle-Insurance-Quotes. ", async () => {
    const topics: SNS.Types.ListTopicsResponse = await sns
      .listTopics()
      .promise();

    const TopicArn = topics!.Topics!.find((c) =>
      c.TopicArn!.endsWith("Insurance-Quote-Reqests")
    )!.TopicArn;
  });

});
