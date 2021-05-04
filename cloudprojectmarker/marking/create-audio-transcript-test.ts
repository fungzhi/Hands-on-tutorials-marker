//Hands-on Lab: Ceate Audio Transcript
//Tutorial Link: https://aws.amazon.com/getting-started/hands-on/create-audio-transcript-transcribe/?nc1=h_ls//

import { expect } from "chai";
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import "mocha";
import * as AWS from "aws-sdk";
import { TranscribeService } from "aws-sdk";

describe("Ceate Audio Transcript", () => {
  const TranscribeService: AWS.TranscribeService = new AWS.TranscribeService();
 
 
     it("should create a transcription job.", async () => {
        const expected = {
            'name': 'sample-transcription-job',
            'media_uri': 's3://create-an-audio-transcript-test/transcribe-sample.mp3',
            'media_format': 'mp3',
            'language_code': 'en-US'
            
        };
        
        expect(2, "transcription job, in the Input file location on S3 field, paste the link to the transcribe-sample.mp3 file in your S3 bucket."
        ).to.eq(expected);  
        
    });

});