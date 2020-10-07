#!/usr/bin/env python3

from aws_cdk import core

from my_project.my_project_stack import MyProjectStack
from marking.create_an_audio_transcript import S3Template
from marking.create_an_audio_transcript import Transcriptfile



app = core.App()
MyProjectStack(app, "my-project")
S3Template, Transcriptfile(app, "marking")

app.synth()