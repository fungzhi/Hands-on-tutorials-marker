from aws_cdk import (aws_s3 as s3, core)

import time
import boto3

class S3Template(core.Stack):
    def __init__(self, app: core.App, id: str, **kwargs) -> None:
        super().__init__(app, id)
        #create an S3 bucket
        myBucket = s3.Bucket(self,
                             'MyFirstBucket',
                             bucket_name='create-audio-transcript-test1',
                             public_read_access= True,
                             )

app = core.App()
S3Template(app, "S3Template", env={'region': 'us-east-1'})
app.synth()

s3_resource = boto3.resource('s3')
s3_resource.meta.client.upload_file(
    Filename='answers/transcribe-sample.mp3',
    Bucket='create-audio-transcript-test1',
    Key='transcribe-sample.mp3')



"""     
transcribe = boto3.client('transcribe')
job_name = "sample-transcription-job"
job_uri = "s3://create-audio-transcript-test1/transcribe-sample.mp3"
class Transcriptfile(core.Stack):
    transcribe.start_transcription_job(
    TranscriptionJobName=job_name,
    Media={'MediaFileUri': job_uri},
    MediaFormat='mp3',
    LanguageCode='en-US'
)
"""