#!/usr/bin/env node
// AWS Educate Lab: Creating an Amazon CloudFront Distribution using Amazon S3 Activity
// Activity Link: https://www.awseducate.com/educator/s/content-view?id=Activity_CloudFront
// Tentative Draft Version

import cdk = require('@aws-cdk/core');
import cloudfront = require('@aws-cdk/aws-cloudfront');
import s3 = require('@aws-cdk/aws-s3');
import s3deploy = require('@aws-cdk/aws-s3-deployment');
import { Construct } from '@aws-cdk/core';


export class CloudFrontWebSite extends Construct {

        // Content bucket
        const cloudfrontBucket = new s3.Bucket(this, 'CloudFrontBucket', {
            bucketName: 'cdk-cloudfront-website-bucket',
            websiteMyCloudFrontTestDocument: 'my-cloudfront-test.html',
            photobitbangersDocument: 'bitbangers.png',
            publicReadAccess: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY
        });
        new cdk.CfnOutput(this, 'Bucket', { value: cloudfrontBucket.bucketName });

        // CloudFront distribution that provides HTTPS
        const distribution = new cloudfront.CloudFrontWebDistribution(this, 'CloudFrontWebsiteDistribution', {
            defaultBehavior: {
                origin: new origins.S3Origin(cloudfrontBucket),
                allowedMethods: AllowedMethods.ALLOW_ALL,
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
              },
            additionalBehaviors: {
                './AWSEducateS3/*.png': {
                    origin: origins.S3Origin(cloudfrontBucket),
                    viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                },
              },
        });
        new cdk.CfnOutput(this, 'DistributionId', { value: distribution.distributionId });

        // Deploy site contents to S3 bucket
        new s3deploy.BucketDeployment(this, 'DeployWithInvalidation', {
            sources: [ s3deploy.Source.asset('./AWSEducateS3') ],
            destinationBucket: 'cdk-cloudfront-website-bucket',
            distribution,
            distributionPaths: ['/*'],
          });