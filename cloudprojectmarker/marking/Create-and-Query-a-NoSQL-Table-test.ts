//Hands-on Lab: Create and Query a NoSQL Table
//Tutorial Link: https://aws.amazon.com/getting-started/hands-on/create-nosql-table/

import { expect } from "chai";
import "mocha";
import * as AWS from "aws-sdk";
AWS.config.update({ region: 'us-east-1' });

describe("DynamoDB", () => {
    const dynamodb: AWS.DynamoDB = new AWS.DynamoDB();

        // Step 1: Create a new NoSQL table with name "Music"
    it("should have 1 DynamoDB table: Music. ", async () => {
        const MusicTable = await dynamodb
            .listTables({ExclusiveStartTableName:"Music"})
            .promise();
        expect(MusicTable,"Music Table exist.").to.be.exist;
    });
    
    // Step 2: Add data to the NoSQL Table in "Music"
    it("should have data records in Music table: Artist-No One You Know. ", async () => {
        const NOYKitems = await dynamodb
            .getItem({
                Key:{
                    "Artist": {
                        S: "No One You Know"
                    },
                    "SongTitle": {
                        SS: ["Call Me Today", "My Dog Spot", "Somewhere Down The Road"]
                        // More items
                    }
                },
                TableName: "Music"
            });
        expect(NOYKitems,"Input 3 records of No One You Know artist exist.").to.be.exist;
    });
    
    it("should have data records in Music table: Artist-The Acme Band. ", async () => {

        const TABitems = await dynamodb
            .getItem({
                Key: {
                    "Artist": {
                        S: "The Acme Band"
                    },
                    "SongTitle": {
                        SS: ["Still in Love", "Look Out, World"]
                        // More items
                    }
                },
                TableName: "Music"
            });
        expect(TABitems,"Input 2 records of The Acme Band artist exist.").to.be.exist;
    });
});
