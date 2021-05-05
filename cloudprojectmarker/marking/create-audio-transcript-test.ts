//Hands-on Lab: Ceate Audio Transcript
//Tutorial Guide: https://aws.amazon.com/getting-started/hands-on/create-audio-transcript-transcribe/?nc1=h_ls//

import { expect } from "chai";
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import "mocha";
import * as AWS from "aws-sdk";
import { S3 } from "aws-sdk";
import { TranscribeService } from "aws-sdk";

describe("Ceate Audio Transcript", () => {
    const s3: AWS.S3 = new AWS.S3();
    const TranscribeService: AWS.TranscribeService = new AWS.TranscribeService();
    
    // Step 1: Create a new S3 bucket
    it("should have 1 S3 bucket.", async () => {
        const AudioBucket = await s3
            .listBuckets({Buckets:{Name: "create-an-audio-transcript-test"}})
            .promise();
        expect(AudioBucket,"create-an-audio-transcript-test.").to.be.exist;
    }); // 1 mark //

    // Step 2: Upload transcribe-sample.mp3 as a object
    it("should have 1 object uploads of audio bucket.", async () => {
        const UploadAudio = await s3
            .getObject({
                Bucket: "create-an-audio-transcript-test",
                Key: ["transcribe-sample.mp3"]
            })
            .listObjects({
                Bucket: "create-an-audio-transcript-test",
                MaxKeys: 2
            })
        expect(UploadAudio,"bucket items upload exist.").to.be.exist;
    }); // 1 mark //
    
 
     // Step 3: Download transcribe-sample.mp3 from https://aws.amazon.com/getting-started/hands-on/create-audio-transcript-transcribe/?nc1=h_ls //
     // Step 4: Go to Amazon Transcribe Service //
     // Step 5: Create a transcribe job and choose transcribe-sample.mp3, please follow the settings of tutoial guide //

    it("should create a transcription job.", async () => {
        const expected = {
            'name': 'sample-transcription-job',
            'media_uri': 's3://create-an-audio-transcript-test/transcribe-sample.mp3',
            'media_format': 'mp3',
            'language_code': 'en-US'
            
        };
        
        expect(expected, "transcription job, in the Input file location on S3 field, paste the link to the transcribe-sample.mp3 file in your S3 bucket."
        ).to.be.exist;
        
    }); // 1 mark //
     // Step 6: Check if the mp3 file has transcribed to text //
     
});