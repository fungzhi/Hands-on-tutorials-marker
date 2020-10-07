from aws_cdk.core import App, Construct;
import aws_cdk.aws_sns as sns;
import aws_cdk.aws_sqs as sqs;
import aws_cdk.aws_sns_subscriptions as subs;

#create a topic with name"Insurance-Quote-Reqests"//
topic = sns.Topic(self, "Topic", topic_name="Insurance-Quote-Reqests");

queue1 = sqs.Queue(self, "Queue1", queue_name="All-Quotes");
queue2 = sqs.Queue(self, "Queue2", queue_name="Life-Insurance-Quotes");
queue3 = sqs.Queue(self, "Queue3", queue_name="Vehicle-Insurance-Quotes");

topic.add_subscription(subs.SqsSubscription(queue1))
