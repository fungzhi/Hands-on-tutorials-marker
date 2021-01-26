# AWS Educate Lab: Build a Static Website with Amazon S3 Activity
# Activity Link: https://www.awseducate.com/educator/s/content-view?id=static_website_s3_activity

from aws_cdk import core
from aws_cdk import (core, aws_s3 as s3)
import boto3


class StaticWebsiteBucket(core.Stack):
    def _init_(self, app: core.App, id: str, **kwargs) -> None:
        super()._init_(app, id)

        # Create Static Website S3 Bucket
        myBucket = s3.Bucket(self, 'static-website-bucket', 
        bucket_name='cdk-s3-static-website1', 
        public_read_access= True, 
        removal_policy= core.RemovalPolicy.DESTROY)
        
        # Upload AWSEducateS3 items to S3 bucket
        s3_resource = boto3.resource('s3')
        s3.Bucket('cdk-s3-static-website').upload_file(
            ['answers/AWSEducateS3/index.html', 'index.html'], 
            ['answers/AWSEducateS3/bitbangers.png', 'bitbangers.png'])