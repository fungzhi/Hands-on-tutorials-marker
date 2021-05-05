// A Cloud Guru Hand on lab: Managing Data in S3 with Versioning and Lifecycle Rules

// https://learn.acloud.guru/handson/9366814c-d237-4e04-9b64-e7c4e0cf1884

import { expect } from "chai";
import "mocha";
import * as AWS from "aws-sdk";
import { S3 } from "aws-sdk";

describe("Managing Data with Versioning and Lifecycle Rules", () => {
    const s3: AWS.S3 = new AWS.S3();

    // Step 1: Create a S3 bucket
    it("should have one S3 bucket.", async () => {
        const ImagesBucket = await s3
            .listBuckets({Buckets:{Name: "versiong-and-lifecycle-rule-bucket"}})
            .promise();
        expect(ImagesBucket,"One bucket exist.").to.be.exist;
    }); // 1 mark //

    // Step 2: Enable versioning
    it("should enable versioning on bucket.", async () => {
        const BucketVersioning = await s3
            .getBucketVersioning({
                Bucket: "versiong-and-lifecycle-rule-bucket"
            })
        expect(BucketVersioning,"Enable versioning on bucket.").to.be.exist;
    }); // 1 mark //


    // Step 3: Create Folder and upload one object
    it("should have one image in folder.", async () => {
        const UploadImage = await s3
            .getObject({
                Bucket: "versiong-and-lifecycle-rule-bucket",
                Folder: "Images/",
                Key: ["Image 1.jpg"]
            })
            .listObjects({
                Bucket: "versiong-and-lifecycle-rule-bucket",
                MaxKeys: 2
            })
        expect(UploadImage,"one image exist.").to.be.exist;
    }); // 1 mark //


    // Step 4: Assign a Lifecycle Rule
    it("should have 1 lifecycle rule.", async () => {
        const Imagerule = await s3
            .getBucketLifecycle({Lifecyclerule:{Name: "image-rule"}})
            .promise();
        expect(Imagerule, "Lifecycle Rule exist.").to.be.exist;
    }); // 1 mark //

});