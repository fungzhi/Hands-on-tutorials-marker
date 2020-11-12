# Hands-on Lab: Create and Query a NoSQL Table
# Tutorial Link: https://aws.amazon.com/getting-started/hands-on/create-nosql-table/

from aws_cdk import (aws_dynamodb as dynamodb, core)
from pprint import pprint
import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError
import pprint


class CreateTable(core.Stack):
    def __init__(self, app: core.App, id: str, **kwargs) -> None:
        super().__init__(app, id)
    
    # Create a NoSQL Table
    def create_music_table(self, dynamodb=None):
        if not dynamodb:
            dynamodb = boto3.resource(
                'dynamodb', endpoint_url="http://localhost:8000")
        
        dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

        table = dynamodb.create_table(
            TableName='Music',
            KeySchema=[
                {
                    'AttributeName': 'Artist',
                    'KeyType': 'HASH'  # Partition key
                },
                {
                    'AttributeName': 'SongTitle',
                    'KeyType': 'RANGE'  # Sort key
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'Artist',
                    'AttributeType': 'S'
                },
                {
                    'AttributeName': 'SongTitle',
                    'AttributeType': 'S'
                },
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            }
        )
        return table


class InputData(core.Stack):
    # Add Data to the NoSQL Table
    def put_music(self, Artist, SongTitle, dynamodb=None):
        if not dynamodb:
            dynamodb = boto3.resource(
                'dynamodb', endpoint_url="http://localhost:8000")

        table = dynamodb.Table('Music')
        response = table.put_item(
            Item={
                'Artist': "No One You Know",
                'SongTitle': "Call Me Today"
            }
        )
        return response


    def update_music(self, Artist, SongTitle, dynamodb=None):
        if not dynamodb:
            dynamodb = boto3.resource(
                'dynamodb', endpoint_url="http://localhost:8000")

        table = dynamodb.Table('Music')

        response = table.update_item(
            Key={
                'Artist':{
                    "No One You Know", "No One You Know",
                    "The Acme Band","The Acme Band"
                },
                'SongTitle':{
                    "My Dog Spot", "Somewhere Down The Road",
                    "Still in Love", "Look Out, World"
                }
            },
            ReturnValues="UPDATED_NEW"
        )
        return response

    if __name__ == '__main__':
        update_response = update_music(
            ["No One You Know", "My Dog Spot"],
            ["No One You Know", "Somewhere Down The Road"],
            ["The Acme Band", ["Still in Love", "Look Out, World"]])
        print("Update music succeeded:")
        pprint.pprint(update_response)


class QueryData(core.Stack):
    # Query the NoSQL Table
    def query_music(self, Artist, dynamodb=None):
        if not dynamodb:
            dynamodb = boto3.resource(
                'dynamodb', endpoint_url="http://localhost:8000")

        table = dynamodb.Table('Music')
        response = table.query(
            KeyConditionExpression=Key('Artist').eq(Artist)
        )
        return response['Items']

    if __name__ == '__main__':
        query_artist = "No One You Know"
        print(f"Music from {query_artist}")
        music = query_music(query_artist, quit)
        for music in music:
            print(music['Artist'], ":", music['SongTitle'])
    elif __name__ == '__main__':
        query_artist = "The Acme Band"
        print(f"Music from {query_artist}")
        music = query_music(query_artist, quit)
        for music in music:
            print(music['Artist'], ":", music['SongTitle'])

    # query songtitle from S
    def query_song(self, SongTitle, dynamodb=None):
        if not dynamodb:
            dynamodb = boto3.resource(
                'dynamodb', endpoint_url="http://localhost:8000")

        table = dynamodb.Table('Music')
        response = table.query(
            KeyConditionExpression=Key('SongTitle').eq(SongTitle)
        )
        return response['Items']

    if __name__ == '__main__':
        query_song = "%S%"
        print(f"Music from {query_song}")
        music = query_music(quit, query_song)
        for music in music:
            print(music['Artist'], ":", music['SongTitle'])


"""
class DeleteData(core.Stack):
    # Delete an Existing Item
    def delete_music(self, Artist, SongTitle, dynamodb=None):
        if not dynamodb:
            dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

        table = dynamodb.Table('Music')

        try:
            response = table.update_item(
                Key={
                    'Artist': Artist,
                    'SongTitle': SongTitle
                },
                UpdateExpression="remove info.SongTitle[Look Out, World]",
                ConditionExpression="size(info.SongTitle) = :str",
                ExpressionAttributeValues={':num': songtitle_count},
                ReturnValues="UPDATED_NEW"
            )
        except ClientError as e:
            if e.response['Error']['Code'] == "ConditionalCheckFailedException":
                print(e.response['Error']['Message'])
            else:
                raise
        else:
            return response

    if __name__ == '__main__':
        print("Attempting conditional update (expecting failure)...")
        update_response = delete_music("The Acme Band", "Look Out, World")
        if update_response:
            print("Update music succeeded:")
            pprint(update_response, sort_dicts=False)


class DeleteTable(core.Stack):
    # Delete a NoSQL Table
    def delete_music_table(self, dynamodb=None):
        if not dynamodb:
            dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

        table = dynamodb.Table('Music')
        table.delete()

    if __name__ == '__main__':
        delete_music_table()
        print("Music table deleted.")
"""
