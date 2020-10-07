from aws_cdk import (aws_s3 as s3, core)

import time
import boto3


class S3Template(core.Stack):
    def __init__(self, app: core.App, id: str, **kwargs) -> None:
        super().__init__(app, id)
        #create an S3 bucket
        myBucket = s3.Bucket(self,
                             'MyFirstBucket',
                             bucket_name='create-audio-transcript')


app = core.App()
S3Template(app, "S3Template", env={'region': 'us-east-1'})
app.synth()

class Transcriptfile(core.Stack):
    def transcribe_file(job_name, file_uri, transcribe_client):
        transcribe_client.start_transcription_job(
            TranscriptionJobName=job_name,
            Media={'MediaFileUri': file_uri},
            MediaFormat='mp3',
            LanguageCode='en-US'
        )

        max_tries = 60
        while max_tries > 0:
            max_tries -= 1
            job = transcribe_client.get_transcription_job(TranscriptionJobName=job_name)
            job_status = job['TranscriptionJob']['TranscriptionJobStatus']
            if job_status in ['COMPLETED', 'FAILED']:
                print(f"Job {job_name} is {job_status}.")
                if job_status == 'COMPLETED':
                    print(
                        f"Download the transcript from\n"
                        f"\t{job['TranscriptionJob']['Transcript']['TranscriptFileUri']}.")
                break
            else:
                print(f"Waiting for {job_name}. Current status is {job_status}.")
            time.sleep(10)


    def main():
        transcribe_client = boto3.client('transcribe')
        file_uri = 's3://create-audio-transcript/transcribe-sample.mp3'
        transcribe_file('sample-transcription-job', file_uri, transcribe_client)


    if __name__ == '__main__':
        main()