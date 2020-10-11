# Hands-on Lab: Filter-Messages-Published-to-Topics//
# tutorial link: https://aws.amazon.com/tw/getting-started/hands-on/filter-messages-published-to-topics/?nc1=h_ls//

from aws_cdk.core import App, Construct
from aws_cdk import (
    aws_sqs as sqs,
    aws_sns as sns,
    aws_sns_subscriptions as subs,
    cdk
    )

from hello_construct import HelloConstruct

class CreateSNS_SQS(cdk.Stack):
    def __init__(self, app: cdk.App, id: str, **kwargs) -> None:
        super().__init__(app, id, **kwargs)
        
        # Create an Amazon SNS Topic: "Insurance-Quote-Reqests" //
        MyTopic = sns.Topic(
            self, "MyTopic", 
            display_name="Insurance-Quote-Reqests"
            )
        
        # Create an Amazon SQS Queues: "All-Quotes" //
        AllQueue = sqs.create_queue(
            self, "AllQueue", 
            queue_name="All-Quotes"
            )
        # Create an Amazon SQS Queues: "Life-Insurance-Quotes" //
        LifeQueue = sqs.Queue(
            self, "LifeQueue", 
            queue_name="Life-Insurance-Quotes"
            )
        # Create an Amazon SQS Queues: "Vehicle-Insurance-Quotes" //
        VehicleQueue = sqs.Queue(
            self, "VehicleQueue", 
            queue_name="Vehicle-Insurance-Quotes"
            )
        
        # Subscribe 3 queues to the topic "Insurance-Quote-Reqests" //
        MyTopic.subscribe_queue(AllQueue)
        MyTopic.subscribe_queue(LifeQueue)
        MyTopic.subscribe_queue(VehicleQueue)
        

# Edit subscription filter policy of "Life-Insurance-Quotes" and "Vehicle-Insurance-Quotes" //
LifePolicy = {"insurance_type": sns.SubscriptionFilter(conditions=["life"])}
VehiclePolicy = {"insurance_type": sns.SubscriptionFilter(conditions=["car", "boat"])}

Life_Sub = subs.SqsSubscription(LifeQueue, filter_policy = LifePolicy)
Vehicle_Sub = subs.SqsSubscription(VehicleQueue, filter_policy = VehiclePolicy)

MyTopic.add_subscription(Life_Sub, Vehicle_Sub)

#
