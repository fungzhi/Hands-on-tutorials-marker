import { expect } from "chai";
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import "mocha";
import { Common } from "./common";
import { EC2 } from "aws-sdk";



describe("Security Group", () => {
    let Sg: EC2.SecurityGroup;
    const common = new Common();
    before(async () => {
    Sg = await common.getSgByName("MySecurityGroup");
    });
    
    
    
    it("for Sg should set properly. ", async () => {
        expect(2, "Sg with 2 ingress rule").to.equal(
            Sg.IpPermissions!.length
        );
        
        expect("0.0.0.0/0", "Sg with ingress rule from anywhere.").to.equal(
            Sg.IpPermissions![0].IpRanges![0].CidrIp
        );

        expect(80, "Sg with ingress rule for port 80.").to.equal(
            Sg.IpPermissions![0].ToPort
        );

        expect("0.0.0.0/0", "Sg with ingress rule from anywhere.").to.equal(
            Sg.IpPermissions![0].IpRanges![0].CidrIp
        );
        
        expect(22, "Sg with ingress rule for port 22.").to.equal(
            Sg.IpPermissions![0].ToPort
        );
        
        expect(1, "Sg with only 1 Egress rule").to.equal(
            Sg.IpPermissionsEgress!.length
        );
        
        expect("0.0.0.0/0", "Sg with Egress rule from anywhere.").to.equal(
            Sg.IpPermissions![0].IpRanges![0].CidrIp
        );
        
        expect(0, "Sg with Egress rule for All traffic.").to.equal(
            Sg.IpPermissions![0].ToPort
        );
        
    });
});
