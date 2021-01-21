#!/usr/bin/env python3

from aws_cdk import core

from answers.send_messages_between_distributed_applications import CreateQueue, SendMessages
from answers.create_and_query_a_nosql_table import CreateTable, InputData, QueryData
from answers.build_a_static_website_with_amazon_s3 import StaticWebsiteBucket
from answers.introduction_to_aws_identity_and_access_management import CreateIAM

app = core.App()
CreateQueue, SendMessages(app, "SqsMessages", env={'region': 'us-east-1'})
CreateTable, InputData, QueryData(app, "DynamodbTable", env={'region': 'us-east-1'})
StaticWebsiteBucket(app, "S3StaticWebsite", env={'region': 'us-east-1'})
CreateIAM(app, "CreateIAM", env={'region': 'us-east-1'})
app.synth()