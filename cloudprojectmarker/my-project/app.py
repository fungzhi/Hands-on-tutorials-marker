#!/usr/bin/env python3

from aws_cdk import core
from my_project.my_project_stack import MyProjectStack
from answers.Store_and_Retrieve_a_File import S3Template

app = core.App()
MyProjectStack(app, "my-project")
S3Template(app, "answers")

app.synth()
