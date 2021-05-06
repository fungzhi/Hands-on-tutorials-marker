import {expect} from "chai";
import "mocha";
import * as AWS from "aws-sdk";
import { Firehose, S3, IAM } from "aws-sdk";
AWS.config.update({region: 'us-east-1'});

describe("Create a Firehose", () => {
    const firehose: AWS.Firehose = new AWS.Firehose();
    const s3: AWS.S3 = new AWS.S3();
    const iam: AWS.IAM =new AWS.IAM();

    // Step 1: Create a new S3 bucket for Firehose
    it("should have 1 S3 bucket for Firehose.", async () => {
        const FriehoseBucket = await s3
            .listBuckets({Buckets:{Name: "firehose-bucket"}})
            .promise();
        expect(FriehoseBucket,"Firehose bucket exist.").to.be.exsit
    });

    // Step 2: Create a new IAM policy with name "FirehosePolicy"
    it("should have 1 IAM policy of Firehose.", async () => {
        const FirehosePolicy = await iam
            .listPolicy({
                Marker: "delivery_policy",
                PolicyUsageFilter: "PermissionsPolicy",
                Scope: AWS
            })
        expect(1,"Firehose policy exist.").to.equal(FirehosePolicy.MarkerNames!.length)
    });

    // Step 3: Create a new Firehose delivery stream with name "TestStrem"
    it("should have 1 Firehose Delivery Stream.", async () => {
        const FirehoseStream = await firehose
            .listDeliveryStreams({
                DeliveryStreamType: "DirectPut",
                ExclusiveStartDeliveryStreamName: "TestStream"
            })
        expect(1,"TestStream Firehose exist.").to.equal(FirehoseStream.ExclusiveStartDeliveryStreamNames!.length)
    });
});