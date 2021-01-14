from aws_cdk import (aws_s3 as s3, core)
import boto3

class S3Template(core.Stack):
    def __init__(self, app: core.App, id: str, **kwargs) -> None:
        super().__init__(app, id)
        #create an S3 bucket
        myBucket = s3.Bucket(self,
                             'MyFirstBucket',
                             bucket_name='20210115bucket',
                             public_read_access= True,
                             )

app = core.App()
S3Template(app, "S3Template", env={'region': 'us-east-1'})
app.synth()

#upload an S3 file
s3_resource = boto3.resource('s3')
s3_resource.meta.client.upload_file(
    Filename='answers/cat.jpg',
    Bucket='20210115bucket',
    Key='cat.jpg')