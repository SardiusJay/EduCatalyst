import { ethers } from "hardhat";

async function main(): Promise<void> {
  console.log("Deploying EduCatalyst Multi-Contract System...");
  
  try {
    // Get signer
    const [deployer] = await ethers.getSigners();
    console.log("Deploying with account:", deployer.address);
    
    // Initial platform fee (2%)
    const platformFee = 200;
    
    console.log("\n1. Deploying Core Contract...");
    const EduCatalystCore = await ethers.getContractFactory("EduCatalystCore");
    const coreContract = await EduCatalystCore.deploy(platformFee, { gasLimit: 5000000 });
    await coreContract.waitForDeployment();
    const coreAddress = await coreContract.getAddress();
    console.log("Core Contract deployed to:", coreAddress);
    
    console.log("\n2. Deploying Organization Contract...");
    const EduCatalystOrganization = await ethers.getContractFactory("EduCatalystOrganization");
    const organizationContract = await EduCatalystOrganization.deploy(coreAddress, { gasLimit: 5000000 });
    await organizationContract.waitForDeployment();
    const organizationAddress = await organizationContract.getAddress();
    console.log("Organization Contract deployed to:", organizationAddress);
    
    console.log("\n3. Deploying Funding Contract...");
    const EduCatalystFunding = await ethers.getContractFactory("EduCatalystFunding");
    const fundingContract = await EduCatalystFunding.deploy(coreAddress, organizationAddress, { gasLimit: 5000000 });
    await fundingContract.waitForDeployment();
    const fundingAddress = await fundingContract.getAddress();
    console.log("Funding Contract deployed to:", fundingAddress);
    
    console.log("\n4. Deploying Milestone Contract...");
    const EduCatalystMilestone = await ethers.getContractFactory("EduCatalystMilestone");
    const milestoneContract = await EduCatalystMilestone.deploy(coreAddress, fundingAddress, { gasLimit: 5000000 });
    await milestoneContract.waitForDeployment();
    const milestoneAddress = await milestoneContract.getAddress();
    console.log("Milestone Contract deployed to:", milestoneAddress);
    
    console.log("\n5. Setting up contract references in Core Contract...");
    
    // Set references in core contract
    let tx = await coreContract.setOrganizationContract(organizationAddress, { gasLimit: 500000 });
    await tx.wait();
    console.log("Organization contract reference set in Core");
    
    tx = await coreContract.setFundingContract(fundingAddress, { gasLimit: 500000 });
    await tx.wait();
    console.log("Funding contract reference set in Core");
    
    tx = await coreContract.setMilestoneContract(milestoneAddress, { gasLimit: 500000 });
    await tx.wait();
    console.log("Milestone contract reference set in Core");
    
    console.log("\nDeployment Summary:");
    console.log("-------------------");
    console.log("Core Contract:         ", coreAddress);
    console.log("Organization Contract: ", organizationAddress);
    console.log("Funding Contract:      ", fundingAddress);
    console.log("Milestone Contract:    ", milestoneAddress);
    console.log("\nDeployment Complete!");
    
  } catch (error) {
    console.error("Deployment failed:", error);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });