import { expect } from "chai";
import "mocha";
import * as AWS from "aws-sdk";
import { Lambda,CloudWatchLogs } from "aws-sdk";

describe("Lambda", () => {
  const lambda: AWS.Lambda = new AWS.Lambda();
  const cloudWatchLogs: AWS.CloudWatchLogs = new AWS.CloudWatchLogs();

  
  it("should have one HelloWorld Lambda Function.", async () => {
    // Download your lambda function code
    //https://raw.githubusercontent.com/linuxacademy/content-lambda-deep-dive/master/section_2/live_act_1/lambda_function.py
    const lambdaFunction = await lambda
      .getFunction({ FunctionName: "HelloWorld" })
      .promise();

    // console.log(lambdaFunction.Configuration);

    let expected = {
      FunctionName: "HelloWorld",
      Runtime: "python3.8",
      Handler: "lambda_function.lambda_handler",
    };

    expect(2, "One Lambda Function").to.eq(lambdaFunction.Functions!.length);

    //  You may need to replace the current test event code:
    // https://raw.githubusercontent.com/linuxacademy/content-lambda-deep-dive/master/section_2/live_act_1/test_event.json
    
  });

  it("should have HelloWorld log group", async () => {
    const HelloWorldlogGroups = await cloudWatchLogs
      .describeLogGroups({
        logGroupNamePrefix: "/aws/lambda/HelloWorld",
      })
      .promise();

  
    expect(2, "One log group").to.equal(HelloWorldlogGroups.logGroups![0].LogGroup);

  });

});  