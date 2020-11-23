#!/usr/bin/env python3

from aws_cdk import core

from my_project.my_project_stack import MyProjectStack
from marking.Filter_Messages_Published_to_Topics import CreateSNSSQS

app = core.App()
MyProjectStack(app, "my-project")
CreateSNSSQS(app, "marking")

app.synth()
