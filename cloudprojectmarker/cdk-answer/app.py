#!/usr/bin/env python3

from aws_cdk import core


from answers.Filter_Messages_Published_to_Topics import CreateSNSSQS
from answers.Create_Public_Subnet import CreatePublicSubnet
from answers.Store_and_Retrieve_a_File import S3Bucket

app = core.App()
CreateSNSSQS(app, "CreateSNSSQS", env={'region': 'us-east-1'})
CreatePublicSubnet(app, "CreatePublicSubnet", env={'region': 'us-east-1'})
S3Bucket(app, "S3Bucket", env={'region': 'us-east-1'})


app.synth()
