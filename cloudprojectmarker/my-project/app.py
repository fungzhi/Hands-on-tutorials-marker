#!/usr/bin/env python3

from aws_cdk import core

from my_project.my_project_stack import MyProjectStack
from answers.create_an_audio_transcript import S3Template
#from answers.create_an_audio_transcript import Transcriptfile



app = core.App()
S3Template(app, "S3Template", env={'region': 'us-east-1'})
#Transcriptfile(app, "Transcriptfile", env={'region': 'us-east-1'})

app.synth()