#!/usr/bin/env python3

from aws_cdk import core

from my_project.my_project_stack import MyProjectStack
from marking.send_messages_between_distributed_applications import CreateQueue, SendMessages
from marking.create_and_query_a_nosql_table import CreateTable, InputData, QueryData
from marking.build_a_static_website_with_amazon_s3 import StaticWebsiteBucket
# Tentative Draft Version
from marking.creating_an_amazon_cloudfront_distribution import CloudFrontWebSite

app = core.App()
MyProjectStack(app, "my-project")
CreateQueue, SendMessages, CreateTable, InputData, QueryData, StaticWebsiteBucket, CloudFrontWebSite(app, "marking")
app.synth()