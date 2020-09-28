# Hands-on Lab: Filter-Messages-Published-to-Topics//
# tutorial link: https://aws.amazon.com/tw/getting-started/hands-on/filter-messages-published-to-topics/?nc1=h_ls//

from aws_cdk.core import App, Construct
import aws_cdk.aws_sns as sns
import aws_cdk.aws_sqs as sqs
import aws_cdk.aws_sns_subscriptions as subs

# Create a topic with name"Insurance-Quote-Reqests"//
snsTopic = sns.Topic(self, "MyTopic", display_name="Insurance-Quote-Reqests")

queue1 = sqs.Queue(self, "Queue1", queue_name="All-Quotes")
queue2 = sqs.Queue(self, "Queue2", queue_name="Life-Insurance-Quotes")
queue3 = sqs.Queue(self, "Queue3", queue_name="Vehicle-Insurance-Quotes")

# Subscribe 3 queues to the topic "Insurance-Quote-Reqests" and
# change the filter policy of Vehicle-Insurance-Quotes//
carpolicy = {"type": sns.SubscriptionFilter(conditions=[{"insurance_type": ["car", "boat"]})}
lifepolicy = {"type": sns.SubscriptionFilter(conditions=[{"insurance_type": ["life"]})}

car_sub = subs.SqsSubscription(queue3, filter_policy = carpolicy)
life_sub = subs.SqsSubscription(queue3, filter_policy = lifepolicy)

snsTopic.add_subscription(subs.SqsSubscription(queue1))
snsTopic.add_subscription(subs.SqsSubscription(queue2))
snsTopic.add_subscription(car_sub,life_sub)

# Publish message to topic//
FirstPublish = snsTopic.publish(self, "InsuranceQuoteRequestd#1", subject="Insurance Quote Request #1")

Message1 = {"type": sns.SubscriptionFilter(conditions=[{"2017 Volvo S60, Montreal"}], type=str)}
Message2 = {"type": sns.SubscriptionFilter(conditions=[{"Townhouse, 1500 sq ft, Toronto"}], type=str)}
