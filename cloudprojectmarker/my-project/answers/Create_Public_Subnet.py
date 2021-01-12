# This is the answer of Original Tutorial: Create VPC

    # cd cloudprojectmarker/my-project
    
    # npm install -g aws-cdk@latest
    
    # npm install -g aws-cdk@latest --force
    
    # python -m venv .env
    
    # source .env/bin/activate
    
    # pip install -r requirements.txt
    
    # python -m pip install aws-cdk.aws-ec2
    
    # cdk ls   (output: CreatePublicSubnet)
    
    # cdk deploy CreatePublicSubnet   (go check the CoudFormation and there will be a stack called "CreatePublicSubnet")

    # Answer deployed!
    
    
from aws_cdk.core import App, Construct
from aws_cdk import (
    aws_ec2 as ec2,
    core
    )


class CreatePublicSubnet(core.Stack):
    def __init__(self, app: core.App, id: str, **kwargs) -> None:
        super().__init__(app, id)
        
        # Create an Amazon VPC: "ANS-VPC" //
        MyVPC = ec2.Vpc(
            self, "ANS-VPC", 
            cidr="10.0.0.0/21", 
            # Configures the maximum number of availability zones as 2 //
            max_azs=2,
            # No nat gateway //
            nat_gateways=0,
            # Create a public subnet with 24 CIDR mask in each AZ //
            subnet_configuration=[
                ec2.SubnetConfiguration(
                    name="Public",
                    cidr_mask=24,
                    subnet_type=ec2.SubnetType.PUBLIC)
                ]
            )
            
        # Add tag to all items //
        core.Tag.add(MyVPC, key="Owner", value="MyVPC")
        
        # One VPC was created (with cidr: 10.0.0.0/16)
        # Please check your items in ANS-VPC: one internet gateway, two AZs, two public subnet in each AZs
        # PublicSubnets route to the internet gateway
        