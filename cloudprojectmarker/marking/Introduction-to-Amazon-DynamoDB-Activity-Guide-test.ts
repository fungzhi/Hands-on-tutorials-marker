//Hands-on Lab: Introduction to Amazon DynamoDB Activity Guide
//Tutorial Source: AWS Career Pathways: Hands-On Activities and Guides

import { expect } from "chai";
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import "mocha";
import * as AWS from "aws-sdk";
import { DynamoDB } from "aws-sdk";

describe("Introduction to Amazon DynamoDB Activity Guide", () => {
    const dynamodb: AWS.DynamoDB = new AWS.DynamoDB();

    // Part 1: Create a DynamoDB table with name "Music" (total 1 mark) //
    it("should have 1 DynamoDB table: Music. ", async () => {
        const MusicTable = await dynamodb
            .listTables({ExclusiveStartTableName:"Music"})
            .promise();
        expect(1,"Music Table exist.").to.equal(MusicTable.TableNames!.length);
    }); // 1 mark //

    // Part 2: Add items to table "Music" (Michael Jackson) (total 1 mark) //
    it("should have 1 row (Michael Jackson). ", async () => {
        const dynamodbTable = await dynamodb
            .getItem({
                Key:{
                    "Artist": {
                        S: "Michael Jackson"
                    },
                    "Song": {
                        S: "Beat It"
                    },
                    "Album": {
                        S: "Thriller"
                    },
                    "Year": {
                        S: "1982"
                    }
                },
                TableName: "Music"
            });
        expect(dynamodbTable,"Input 3 records of No One You Know artist exist.").to.be.exist;
    }); // 1 mark //

    // Part 3: Add items to table "Music" (Drake) (total 1 mark) //
    it("should have 1 row (Drake). ", async () => {
        const dynamodbTable = await dynamodb
            .getItem({
                Key:{
                    "Artist": {
                        S: "Drake"
                    },
                    "Song": {
                        S: "Best I Ever Had"
                    },
                    "Album": {
                        S: "Thank Me Later"
                    },
                    "Year": {
                        S: "2009"
                    },
                    "LengthSeconds": {
                        S: "259"
                    }
                },
                TableName: "Music"
            });
        expect(dynamodbTable,"Input 3 records of No One You Know artist exist.").to.be.exist;
    }); // 1 mark //

    // Part 4: Add items to table "Music" (Lady Gaga) (total 1 mark) //
    it("should have 1 row (Lady Gaga). ", async () => {
        const dynamodbTable = await dynamodb
            .getItem({
                Key:{
                    "Artist": {
                        S: "Lady Gaga"
                    },
                    "Song": {
                        S: "Poker Face"
                    },
                    "Album": {
                        S: "The Fame"
                    },
                    "Year": {
                        S: "2008"
                    },
                    "LengthSeconds": {
                        S: "Pop"
                    }
                },
                TableName: "Music"
            });
        expect(dynamodbTable,"Input 3 records of No One You Know artist exist.").to.be.exist;
    }); // 1 mark //
});