// Hands-on Lab: CCreate an Audio Transcript//
// tutorial link: https://aws.amazon.com/getting-started/hands-on/create-audio-transcript-transcribe/?nc1=h_ls//

import { expect } from "chai";
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import "mocha";
import * as AWS from "aws-sdk";
import { S3 } from "aws-sdk";
import { Transcribe } from "aws-sdk";

describe("S3 and Transcribe", () => {
  const s3: AWS.S3 = new AWS.S3();
  const Transcribe: AWS.Transcribe = new AWS.Transcribe();
 
 
  
    //Part 1: Create a S3 bucket with name "create-audio-transcript1" (total 1 mark) //
  it("should have 1 S3 bucket: create-audio-transcript1. ", async () => {
    // Set the AWS region
    const REGION = "us-east-1";

    //Attempt to create the bucket
    const stack = new cdk.Stack();
    new s3.Bucket(stack, 'create-audio-transcript1');
    
    //Part 2: Upload 'transcribe-sample.mp3' file (total 1 mark) //
    //Part 3: Set S3 bucket permission to public (total 1 mark) //
    
    //Part 4: Create transcription job with S3 field (On the Amazon Transcribe console, open the navigation pane and click Transcription jobs, click Create job.) (total 2 mark)//
    it("should create a transcription job.", async () => {
        const expected = {
            'name': 'sample-transcription-job',
            'media_uri': 's3://create-audio-transcript1/transcribe-sample.mp3',
            'media_format': 'mp3',
            'language_code': 'en-US'
            
        };
        
        expect(2, "transcription job, in the Input file location on S3 field, paste the link to the transcribe-sample.mp3 file in your S3 bucket."
        ).to.containSubset(expected);  // 2 mark //
    
    //Part 5: Review transcription results: go to the Transcription jobs screen, click on the sample-transcription-job link to view the transcription results. Scroll down to the Transcription panel to view the transcription job output. //
    