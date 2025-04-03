// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./EduCatalystOrganization.sol";
import "./EducatalystFunding.sol";
import "./EduCatalystMilestone.sol";

/**
 * @title EduCatalystCore
 * @dev Core contract for the EduCatalyst platform that coordinates between other contracts
 */
contract EduCatalystCore {
    address public owner;
    uint256 public platformFeePercent;
    uint256 public constant MAX_FEE = 500; // Maximum 5% fee
    
    EduCatalystOrganization public organizationContract;
    EduCatalystFunding public fundingContract;
    EduCatalystMilestone public milestoneContract;
    
    constructor(uint256 _platformFeePercent) {
        require(_platformFeePercent <= MAX_FEE, "Fee too high");
        owner = msg.sender;
        platformFeePercent = _platformFeePercent;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    function setOrganizationContract(address _organizationContract) external onlyOwner {
        organizationContract = EduCatalystOrganization(_organizationContract);
    }
    
    function setFundingContract(address _fundingContract) external onlyOwner {
        fundingContract = EduCatalystFunding(_fundingContract);
    }
    
    function setMilestoneContract(address _milestoneContract) external onlyOwner {
        milestoneContract = EduCatalystMilestone(_milestoneContract);
    }
    
    function updatePlatformFee(uint256 _newFeePercent) external onlyOwner {
        require(_newFeePercent <= MAX_FEE, "Fee too high");
        platformFeePercent = _newFeePercent;
    }
    
    // Functions to delegate calls to specific contracts
    function getPlatformFee() external view returns (uint256) {
        return platformFeePercent;
    }
    
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "New owner cannot be zero address");
        owner = _newOwner;
    }
}