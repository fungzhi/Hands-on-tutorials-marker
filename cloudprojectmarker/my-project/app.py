#!/usr/bin/env python3

from aws_cdk import core

from my_project.my_project_stack import MyProjectStack
from marking.send_messages_between_distributed_applications import SendMessages, DeleteMessages, DeleteSQS
from marking.create_and_query_a_noaql_table import CreateTable, InputData, QueryData, DeleteData, DeleteTable

app = core.App()
MyProjectStack(app, "my-project")
SendMessages, DeleteMessages, DeleteSQS(app, "marking")
CreateTable, InputData, QueryData, DeleteData, DeleteTable(app, "marking")

app.synth()
