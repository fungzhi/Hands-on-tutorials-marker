#!/usr/bin/env python3

from aws_cdk import core


from answers.Filter_Messages_Published_to_Topics import CreateSNSSQS
from answers.Create_Public_Subnet import CreatePublicSubnet
from answers.Store_and_Retrieve_a_File import S3Bucket
from answers.send_messages_between_distributed_applications import CreateQueue, SendMessages
from answers.create_and_query_a_nosql_table import CreateTable, InputData, QueryData
from answers.build_a_static_website_with_amazon_s3 import StaticWebsiteBucket
# Tentative Draft Version
# from marking.creating_an_amazon_cloudfront_distribution import CloudFrontWebSite
from answers.introduction_to_aws_identity_and_access_management import IAM
from answers.create_an_audio_transcript import S3Template
#from answers.create_an_audio_transcript import Transcriptfile

app = core.App()
CreateSNSSQS(app, "CreateSNSSQS", env={'region': 'us-east-1'})
CreatePublicSubnet(app, "CreatePublicSubnet", env={'region': 'us-east-1'})
S3Bucket(app, "S3Bucket", env={'region': 'us-east-1'})
# Tentative Draft Version
# CreateQueue, SendMessages, CreateTable, InputData, QueryData, StaticWebsiteBucket, CloudFrontWebSite, IAM(app, "marking")
CreateQueue, SendMessages(app, "CreateSNSSQS", env={'region': 'us-east-1'})
CreateTable, InputData, QueryData(app, "CreateSNSSQS", env={'region': 'us-east-1'})
StaticWebsiteBucket(app, "StaticWebsiteBucket", env={'region': 'us-east-1'})
IAM(app, "CreateSNSSQS", env={'region': 'us-east-1'})
S3Template(app, "S3Template", env={'region': 'us-east-1'})
#Transcriptfile(app, "Transcriptfile", env={'region': 'us-east-1'})


app.synth()
