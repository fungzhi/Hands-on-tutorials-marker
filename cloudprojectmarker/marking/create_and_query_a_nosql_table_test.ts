//Hands-on Lab: Create and Query a NoSQL Table
//Tutorial Link: https://aws.amazon.com/getting-started/hands-on/create-nosql-table/

import { expect } from "chai";
import "mocha";
import * as AWS from "aws-sdk";
import { DynamoDB } from "aws-sdk";
AWS.config.update({ region: 'us-east-1' });

describe("DynamoDB", () => {
    const dynamodb: AWS.DynamoDB = new AWS.DynamoDB();

    it("should have 1 table. ", async () => {
        const MusicTable = await DynamoDB
        DynamoDB.createTable(MusicTable, function (err, data) {
            if (err) console.log(err, err.stack);
            else console.log(data);
            data = {
                TableDescription: {
                    AttributeDefinitions: [
                        {
                            AttributeName: "Artist",
                            AttributeType: "S"
                        },
                        {
                            AttributeName: "SongTitle",
                            AttributeType: "S"
                        }
                    ],
                    KeySchema: [
                        {
                            AttributeName: "Artist",
                            KeyType: "HASH"
                        },
                        {
                            AttributeName: "SongTitle",
                            KeyType: "RANGE"
                        }
                    ],
                    ProvisionedThroughput: {
                        ReadCapacityUnits: 5,
                        WriteCapacityUnits: 5
                    },
                    TableName: "Music",
                    TableStatus: "CREATING"
                }
            }
        })
    })

    it("should have input 1 item. ", async () => {
        const MusicData = await DynamoDB
        DynamoDB.putItem(MusicData, function (err, data) {
            if (err) console.log(err, err.stack);
            else console.log(data);
            data = {
                Item: {
                    "Artist": {
                        S: "No One You Know"
                    },
                    "SongTitle": {
                        S: "Call Me Today"
                    }
                },
                ReturnConsumedCapacity: "TOTAL",
                TableName: "Music"
            }
        })
    })

    it("should have input items. ", async () => {
        const MusicUpdateData = await DynamoDB
        DynamoDB.putItem(MusicUpdateData, function (err, data) {
            if (err) console.log(err, err.stack);
            else console.log(data);
            data = {
                Item: {
                    "Artist": {
                        S: [
                            "No One You Know","No One You Know", 
                            "The Acme Band", "The Acme Band"
                        ]
                    },
                    "SongTitle": {
                        S: [
                            "My Dog Spot", "Somewhere Down The Road",
                            "Still in Love", "Look Out, World"
                        ]
                    },
                },
                ReturnConsumedCapacity: "TOTAL",
                TableName: "Music"
            }
        })
    })
});
