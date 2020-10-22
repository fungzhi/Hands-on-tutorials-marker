# Hands-on Lab: Send Messages Between Distributed Applications
# Tutorial Link: https://aws.amazon.com/getting-started/hands-on/send-messages-distributed-applications/

from aws_cdk.core import App, Construct
import aws_cdk.aws_sqs as sqs
from botocore.exceptions import OrdersError


# Create an Amazon SQS Queue
queue = sqs.Queue(self, 'Queue', queue_name='Orders')


class SendMessages(core.Stack):
    # Send Messages to the Queue
    def send_message(queue, message_body, message_attributes):
        try:
            response = queue.send_message(
                MessageBody=message_body,
                MessageAttributes=message_attributes
            )
        except OrdersErrorr as error:
            logger.exception("Send message failed: %s", message_body)
            raise error
        else:
            return response


    def send_messages(queue, messages):
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
        except OrdersError as error:
            logger.exception("Send messages failed to queue: %s", queue)
            raise error
        else:
            return response

"""
class DeleteMessages(core.Stack):
    # Retrieve and Delete a Message
    def receive_messages(queue, max_number, wait_time):
        try:
            messages = queue.receive_messages(
                MessageAttributeNames=['Order-Type'],
                MaxNumberOfMessages=max_number,
                WaitTimeSeconds=wait_time
            )
            for msg in messages:
                logger.info("Received message: %s: %s", msg.message_id, msg.body)
        except OrdersError as error:
            logger.exception("Couldn't receive messages from queue: %s", queue)
            raise error
        else:
            return messages


    def delete_message(message):
        try:
            message.delete()
            logger.info("Deleted message: %s", message.message_id)
        except OrdersError as error:
            logger.exception("Couldn't delete message: %s", message.message_id)
            raise error


class DeleteSQS(core.Stack):
    # Delete the Queue
    def delete_queue(queue):
        try:
            delete_message(message=delete)
            queue.delete(queue_name='Orders')
            logger.info("Deleted Queue: %s", queue.queue_name)
        except OrdersError as error:
            logger.exception("Couldn't delete queue: %s", queue.queue_name)
            raise error
"""