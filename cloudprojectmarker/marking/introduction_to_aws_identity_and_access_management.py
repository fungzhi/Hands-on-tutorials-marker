# Hands-on Lab: Introduction to AWS Identity and Access Management
# Tutorial Link: https://learn.acloud.guru/handson/4b620748-f44f-408a-a42b-f727a208e952

from aws_cdk import core
from aws_cdk import (core, aws_iam as iam)
import time
import boto3


class IAM(core.Stack):
    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)
        
    # Create IAM users
    def create_users(self, username, password):
        user1 = iam.create_user('user-1', { password: '123456' })
        user2 = iam.create_user('user-2', { password: '123456' })
        user3 = iam.create_user('user-3', { password: '123456' })

    # Create IAM groups and policy
    def create_groups(self, groupname):        
        group1 = iam.create_group("EC2-Admin")
        group2 = iam.create_group("EC2-Support")
        group3 = iam.create_group("S3-Support")
        
        def create_policies(self, PolicyStatement):
            group1.add_inline_policy(PolicyStatement(
                version = ["2012-10-17"],
                actions = ["ec2:Describe*", "ec2:StartInstances", "ec2:StopInstances",
                "elasticloadbalancing:Describe*",
                "cloudwatch:ListMetrics","cloudwatch:GetMetricStatistics","cloudwatch:Describe*",
                "autoscaling:Describe*"],
                resources = ["*"],
                effect = [{ "Deny": ["ec2:Describe*", "ec2:StartInstances", "ec2:StopInstances"] }]
            ))
            
            group2.add_inline_policy(PolicyStatement(
                version = ["2012-10-17"],
                actions = ["ec2:Describe*", "elasticloadbalancing:Describe*",
                "cloudwatch:ListMetrics","cloudwatch:GetMetricStatistics","cloudwatch:Describe*",
                "autoscaling:Describe*"],
                resources = ["*"],
                effect = ["Allow"]
            ))
            
            group3.add_inline_policy(PolicyStatement(
                version = ["2012-10-17"],
                actions = ["s3:Get*", "s3:List*"],
                resources = ["*"],
                effect = ["Allow"]
            ))


    # Join users to groups
    def join_group(self, group):
        user1 = iam.addToGroup({ group: "S3-Support" })
        user2 = iam.addToGroup({ group: "EC2-Support" })
        user3 = iam.addToGroup({ group: "EC2-Admin" })