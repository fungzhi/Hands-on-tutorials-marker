# AWS Educate Lab: Build a Static Website with Amazon S3 Activity
# Activity Link: https://www.awseducate.com/educator/s/content-view?id=static_website_s3_activity

from aws_cdk import core
from aws_cdk import (core, aws_s3 as s3)


class StaticWebsiteBucket(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        # Create Static Website S3 Bucket
        bucket = s3.Bucket(self, id + "_static-website-bucket",
            bucket_name= ('cdk-s3-static-website'),
            website_index_document= 'hello-world.html',
            website_error_document= 'error.html',
            public_read_access= True,
            removal_policy= core.RemovalPolicy.DESTROY)

'''        
        # Deploy site contents to S3 bucket    
        folder = s3.BucketDeployment(self, 'DeployWithInvalidation',
            sources = s3.Source.asset('./site-contents'),
            destinationBucket = ('cdk-s3-static-website'),
            distributionPaths = ('/*')
        )
'''