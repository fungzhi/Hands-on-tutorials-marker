#!/usr/bin/env python3

from aws_cdk import core

from my_project.my_project_stack import MyProjectStack
from marking.Filter_Messages_Published_to_Topics import CreateSNS_SQS


app = core.App()
MyProjectStack(app, "my-project")
CreateSNS_SQS(app, "marking")

app.synth()
