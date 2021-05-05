// AWS Educate Lab: Build a Static Website with Amazon S3 Activity
// Activity Link: https://www.awseducate.com/educator/s/content-view?id=static_website_s3_activity

import { expect } from "chai";
import "mocha";
import * as AWS from "aws-sdk";
import { S3 } from "aws-sdk";

describe("Build a Static Website with Amazon S3", () => {
    const s3: AWS.S3 = new AWS.S3();

    // Step 1: Create a new S3 bucket
    it("should have 1 S3 bucket.", async () => {
        const WebsiteBucket = await s3
            .listBuckets({Buckets:{Name: "static-website-bucket"}})
            .promise();
        expect(WebsiteBucket,"Static website bucket exist.").to.be.exist;
    }); // 1 mark //

    // Step 2: Upload "bitbangers.png" and "index.html" in static website bucket
    it("should have 2 item uploads of static website bucket.", async () => {
        const UploadStaticWebsite = await s3
            .getObject({
                Bucket: "static-website-bucket",
                Key: ["bitbangers.png","index.html"]
            })
            .listObjects({
                Bucket: "static-website-bucket",
                MaxKeys: 2
            })
        expect(UploadStaticWebsite,"Static website items upload exist.").to.be.exist;
    }); // 1 mark //
});