// A Cloud Guru Hand on lab: Creating a Simple AWS Lambda Function
 
// https://learn.acloud.guru/handson/f2b58b6b-2a05-435a-8746-ca1ff25b9773

import { expect } from "chai";
import "mocha";
import * as AWS from "aws-sdk";
import { Lambda } from "aws-sdk";
import { CloudWatchLogs } from "aws-sdk";

describe("Lambda", () => {
  const lambda: AWS.Lambda = new AWS.Lambda();
  const cloudWatchLogs: AWS.CloudWatchLogs = new AWS.CloudWatchLogs();

  // Step 1: Create a Lambda Function
  it("should have one HelloWorld Lambda Function.", async () => {
    // Download your lambda function code
    //https://raw.githubusercontent.com/linuxacademy/content-lambda-deep-dive/master/section_2/live_act_1/lambda_function.py
    const lambdaFunction = await lambda
      .getFunction({ FunctionName: "HelloWorld" })
      .promise();

    let expected = {
      FunctionName: "HelloWorld",
      Runtime: "python3.8",
      Handler: "lambda_function.lambda_handler",
    };

    expect(1, "One Lambda Function").to.eq(lambdaFunction.Functions!.length);

    //  Replace the current test event code:
    // https://raw.githubusercontent.com/linuxacademy/content-lambda-deep-dive/master/section_2/live_act_1/test_event.json
    
  });

  // Step 2: Check CloudWatch Log Group
  it("should have HelloWorld log group", async () => {
    const HelloWorldlogGroups = await cloudWatchLogs
      .describeLogGroups({
        logGroupNamePrefix: "/aws/lambda/HelloWorld",
      })
      .promise();

    expect(1, "One log group").to.equal(HelloWorldlogGroups.logGroups![0].LogGroup);

  });

});  