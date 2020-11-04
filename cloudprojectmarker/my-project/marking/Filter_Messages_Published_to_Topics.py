# Hands-on Lab: Filter-Messages-Published-to-Topics//
# tutorial link: https://aws.amazon.com/tw/getting-started/hands-on/filter-messages-published-to-topics/?nc1=h_ls//

from aws_cdk.core import App, Construct
from aws_cdk import (
    aws_sqs as sqs,
    aws_sns as sns,
    aws_sns_subscriptions as subs,
    core
    )


class CreateSNSSQS(core.Stack):
     # Create an Amazon SNS Topic: "Insurance-Quote-Reqests" //
    def __init__(self, app: core.App, id: str, **kwargs) -> None:
        super().__init__(app, id)
       
        MyTopic = sns.Topic(
            self, "ANS-Insurance-Quote-Reqests", 
            topic_name="ANS-Insurance-Quote-Reqests"
            )
           
        # Create 3 Amazon SQS Queues: "All-Quotes", "Life-Insurance-Quotes", "Vehicle-Insurance-Quotes" // 
        # Create an queues with name "All-Quotes" //
        AllQueue = sqs.Queue(
            self, "ANS-AllQueue", 
            queue_name="ANS-All-Quotes"
            )
        # Create an queues with name "Life-Insurance-Quotes" //
        LifeQueue = sqs.Queue(
            self, "ANS-LifeQueue", 
            queue_name="ANS-Life-Insurance-Quotes"
            )
        # Create an queues with name "Vehicle-Insurance-Quotes" //
        VehicleQueue = sqs.Queue(
            self, "ANS-VehicleQueue", 
            queue_name="ANS-Vehicle-Insurance-Quotes"
            )
        
        # Edit subscription filter policy of "Life-Insurance-Quotes" and "Vehicle-Insurance-Quotes" //
        lifepolicy = {"insurance_type": sns.SubscriptionFilter(conditions=["life"])}
        valuepolicy = {"insurance_type": sns.SubscriptionFilter(conditions=["car", "boat"])}

        life_sub = subs.SqsSubscription(LifeQueue, filter_policy = lifepolicy)
        vehicle_sub = subs.SqsSubscription(VehicleQueue, filter_policy = valuepolicy)
        
        # Subscribe 3 queues and both filter policy to the topic "Insurance-Quote-Reqests" //
        MyTopic.add_subscription(subs.SqsSubscription(AllQueue))
        MyTopic.add_subscription(life_sub)
        MyTopic.add_subscription(vehicle_sub)
        
#metricNumberOfMessagesPublished

app = core.App()
CreateSNSSQS(app, "CreateSNSSQS", env={'region': 'us-east-1'})
app.synth
