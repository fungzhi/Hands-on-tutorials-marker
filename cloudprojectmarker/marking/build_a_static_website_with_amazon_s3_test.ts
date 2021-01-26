# AWS Educate Lab: Build a Static Website with Amazon S3 Activity
# Activity Link: https://www.awseducate.com/educator/s/content-view?id=static_website_s3_activity

import {expect} from "chai";
import "mocha";
import * as AWS from "aws-sdk";
import { S3 } from "aws-sdk";
AWS.config.update({region: 'us-east-1'});

describe("S3 Static Website", () => {
    const s3: AWS.S3 = new AWS.S3();

    it("should have a S3 bucket.", async () => {
        const stack = new cdk.Stack();
        new s3.Bucket(stack, "static-website-bucket");
    });
    expect(1, "Create a S3 bucket.").to.containSubset(expected); 

    it("should upload a static website.", async () => {
        const expected = {
            Name: "static-website-bucket",
            Media_URL: 's3://static-website-bucket/index.html',
            MediaFormat: "html",
            LanguageCode: 'en-US'
        };
    });
    expect(2, "Upload the indext.html file in your S3 bucket.").to.containSubset(expected);
});