import { expect } from "chai";
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import "mocha";
import { Common } from "./common";
import { EC2 } from "aws-sdk";



describe("Create Security Group", () => {
    let mySg: EC2.SecurityGroup;
    const common = new Common();
    before(async () => {
    mySg = await common.getSgByName("EC2 Security Group");
    });
    
    // Step 1: Create a Security Group
    // Step 2: Set two inbount rules
    it("for mySg should set properly(ingress rule 1). ", async () => {
        expect(1, "mySg with 1 ingress rule").to.equal(
            mySg.IpPermissions!.length
        );
        
        expect("0.0.0.0/0", "mySg with ingress rule from anywhere.").to.equal(
            mySg.IpPermissions![0].IpRanges![0].CidrIp
        );

        expect(80, "mySg with ingress rule for port 80.").to.equal(
            mySg.IpPermissions![0].ToPort
        );
    }); // 1 mark //
        
        
    it("for mySg should set properly(ingress rule 2). ", async () => {
        expect(1, "mySg with 1 ingress rule").to.equal(
            mySg.IpPermissions!.length
        );
        expect("0.0.0.0/0", "mySg with ingress rule from anywhere.").to.equal(
            mySg.IpPermissions![0].IpRanges![0].CidrIp
        );
        
        expect(22, "mySg with ingress rule for port 22.").to.equal(
            mySg.IpPermissions![0].ToPort
        );
    });  // 1 mark //

    
    // Step 3: Set an outbount rule
    it("for mySg should set properly(Egress rule). ", async () => {		
        expect(1, "mySg with only 1 Egress rule").to.equal(
            mySg.IpPermissionsEgress!.length
        );
        
        expect("0.0.0.0/0", "mySg with Egress rule from anywhere.").to.equal(
            mySg.IpPermissions![0].IpRanges![0].CidrIp
        );
        
        expect(0, "mySg with Egress rule for All traffic.").to.equal(
            mySg.IpPermissions![0].ToPort
        );

    }); // 1 mark //
});