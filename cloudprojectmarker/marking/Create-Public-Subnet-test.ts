import { expect } from "chai";
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import "mocha";
import * as AWS from "aws-sdk";
import { EC2 } from "aws-sdk";

describe("SQS and SNS", () => {
  const ec2: AWS.EC2 = new AWS.EC2();
  
    // Part 1: Create a VPC called "Tutorial VPC" with cidr "10.0.0.0/16" (total 1 mark) //
    it("should be with cidr 10.0.0.0/16.", async () => {
        let params: EC2.Types.DescribeVpcsRequest = {
          Filters: [{ Name: "tag:Name", Values: ["Tutoial VPC"] }],
        };
        const vpcs: EC2.Types.DescribeVpcsResult = await ec2
          .describeVpcs(params)
          .promise();
        // console.log(vpcs);
        // console.log(vpcs.Vpcs![0]);
        // console.log(vpcs.Vpcs![0].CidrBlock);
    
        expect(vpcs.Vpcs![0].CidrBlock).to.equal("10.0.0.0/16");
    });

    // Part 2: Create two public subnet with cidr "10.0.0.0/24" and "10.0.1.0/24" (total 1 mark)
    it("should be with 2 subnets with proper Cidr address.", async () => {
        let params: EC2.Types.DescribeVpcsRequest = {
          Filters: [{ Name: "tag:Name", Values: ["Tutoial VPC"] }],
        };
        const vpcs: EC2.Types.DescribeVpcsResult = await ec2
          .describeVpcs(params)
          .promise();
    
        params = {
          Filters: [
            {
              Name: "vpc-id",
              Values: [vpcs.Vpcs![0].VpcId!],
            },
          ],
        };
        const subnets: EC2.Types.DescribeSubnetsResult = await ec2
          .describeSubnets(params)
          .promise();
        // console.log(subnets.Subnets!);
        //console.log(subnets.Subnets!.map((c) => c.CidrBlock).sort());
    
        expect(2).to.equal(subnets.Subnets!.length);
        let expectedCidrAddresses = [
          "10.0.0.0/24",
          "10.0.1.0/24",
        ];
        expect(expectedCidrAddresses).to.deep.equal(
          subnets.Subnets!.map((c) => c.CidrBlock).sort()
        );
    });
    // End Lab //
    // Check the answer with cdk-answer/answers/Create_Public_Subnet.py //
});