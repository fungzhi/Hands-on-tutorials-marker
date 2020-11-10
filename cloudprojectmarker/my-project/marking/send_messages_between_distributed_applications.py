# Hands-on Lab: Send Messages Between Distributed Applications
# Tutorial Link: https://aws.amazon.com/getting-started/hands-on/send-messages-distributed-applications/

from aws_cdk import (aws_sqs as sqs, core)
from botocore.exceptions import ClientError
import boto3


class CreateQueue(core.Stack):
    def __init__(self, app: core.App, id: str, **kwargs) -> None:
        super().__init__(app, id)
    
    # Create an Amazon SQS Queue
    def create_queue(self, name, attributes=None):
        sqs = boto3.resource('sqs')
        sqs.create_queue(
            QueueName='Orders',
            Attributes=None
        )


class SendMessages(core.Stack):
    # Send Messages to the Queue
    def send_message(self, queue, message_body, message_attributes):
        try:
            response = queue.send_message(
                MessageBody=message_body,
                MessageAttributes=message_attributes
            )
        except ClientErrorr as error:
            logger.exception("Send message failed: %s", message_body)
            raise error
        else:
            return response


    def send_messages(self, queue, messages):
        try:
            entries = [{
                'Id': str(ind),
                'MessageBody': msg['1 x Widget @ $29.99 USD'
                                '2 x Widget Cables @ $4.99'],
                'MessageAttributes': msg['Online']}
                for ind, msg in enumerate(messages)]
            response = queue.send_messages(Entries=entries)
            if 'Successful' in response:
                for msg_meta in response['Successful']:
                    logger.info(
                        "Message sent: %s: %s",
                        msg_meta['MessageId'],
                        messages[int(msg_meta['Id'])]['body']
                    )
            if 'Failed' in response:
                for msg_meta in response['Failed']:
                    logger.warning(
                        "Failed to send: %s: %s",
                        msg_meta['MessageId'],
                        messages[int(msg_meta['Id'])]['body']
                    )
        except ClientError as error:
            logger.exception("Send messages failed to queue: %s", queue)
            raise error
        else:
            return response

"""
class DeleteMessages(core.Stack):
    # Retrieve and Delete a Message
    def receive_messages(self, queue, max_number, wait_time):
        try:
            messages = queue.receive_messages(
                MessageAttributeNames=['Order-Type'],
                MaxNumberOfMessages=max_number,
                WaitTimeSeconds=wait_time
            )
            for msg in messages:
                logger.info("Received message: %s: %s", msg.message_id, msg.body)
        except ClientError as error:
            logger.exception("Couldn't receive messages from queue: %s", queue)
            raise error
        else:
            return messages


    def delete_message(self, message):
        try:
            message.delete()
            logger.info("Deleted message: %s", message.message_id)
        except ClientError as error:
            logger.exception("Couldn't delete message: %s", message.message_id)
            raise error


class DeleteSQS(core.Stack):
    # Delete the Queue
    def delete_queue(self, queue):
        try:
            delete_message(message=delete)
            queue.delete(queue_name='Orders')
            logger.info("Deleted Queue: %s", queue.queue_name)
        except ClientError as error:
            logger.exception("Couldn't delete queue: %s", queue.queue_name)
            raise error
"""