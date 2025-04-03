// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Educatalyst.sol";
import "./EducatalystFunding.sol";

/**
 * @title EduCatalystMilestone
 * @dev Manages milestones for funding requests
 */
contract EduCatalystMilestone {
    EduCatalystCore public core;
    EduCatalystFunding public fundingContract;
    
    struct Milestone {
        uint256 requestId;
        string description;
        uint256 percentage; // Percentage of total funding (in basis points)
        bool released;
        bool approved;
    }
    
    // requestId => milestone array
    mapping(uint256 => Milestone[]) public milestones;
    
    event MilestoneCreated(uint256 indexed requestId, uint256 milestoneIndex, string description, uint256 percentage);
    event MilestoneApproved(uint256 indexed requestId, uint256 milestoneIndex);
    event FundsReleased(uint256 indexed requestId, address indexed orgAddress, uint256 amount);
    event RemainingFundsProcessed(uint256 indexed requestId, bool returnedToSponsors);
    event RefundIssued(uint256 indexed requestId, address indexed sponsor, uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == core.owner(), "Only owner can call this function");
        _;
    }
    
    modifier validRequest(uint256 requestId) {
        (,,,,,,,,, EduCatalystFunding.FundingStatus status,) = fundingContract.getFundingRequestDetails(requestId);
        require(status == EduCatalystFunding.FundingStatus.Funded || 
                status == EduCatalystFunding.FundingStatus.PartiallyFunded, 
                "Request is not funded");
        _;
    }
    
    constructor(address _coreAddress, address _fundingAddress) {
        core = EduCatalystCore(_coreAddress);
        fundingContract = EduCatalystFunding(_fundingAddress);
    }
    
    /**
     * @dev Create milestones for a funding request
     * @param _requestId ID of the funding request
     * @param _descriptions Array of milestone descriptions
     * @param _percentages Array of milestone percentages (in basis points)
     */
    function createMilestones(
        uint256 _requestId,
        string[] memory _descriptions,
        uint256[] memory _percentages
    ) external {
        (address orgAddress,,,,,,,,, EduCatalystFunding.FundingStatus status,) = 
            fundingContract.getFundingRequestDetails(_requestId);
        
        require(msg.sender == orgAddress, "Only the organization that created this request can call this function");
        require(status == EduCatalystFunding.FundingStatus.Funded || 
                status == EduCatalystFunding.FundingStatus.PartiallyFunded, 
                "Request is not funded");
        require(_descriptions.length == _percentages.length, "Arrays must match in length");
        require(milestones[_requestId].length == 0, "Milestones already exist for this request");
        
        // Verify milestone percentages add up to 100%
        uint256 totalPercentage = 0;
        for (uint i = 0; i < _percentages.length; i++) {
            totalPercentage += _percentages[i];
        }
        require(totalPercentage == 10000, "Milestone percentages must total 100%");
        
        // Create milestones
        for (uint i = 0; i < _descriptions.length; i++) {
            milestones[_requestId].push(Milestone({
                requestId: _requestId,
                description: _descriptions[i],
                percentage: _percentages[i],
                released: false,
                approved: false
            }));
            
            emit MilestoneCreated(_requestId, i, _descriptions[i], _percentages[i]);
        }
    }
    
    /**
     * @dev Approve a milestone for release (only owner for now, could be expanded to a DAO vote)
     * @param _requestId ID of the funding request
     * @param _milestoneIndex Index of the milestone
     */
    function approveMilestone(uint256 _requestId, uint256 _milestoneIndex) external onlyOwner validRequest(_requestId) {
        require(_milestoneIndex < milestones[_requestId].length, "Invalid milestone index");
        
        Milestone storage milestone = milestones[_requestId][_milestoneIndex];
        require(!milestone.approved, "Milestone already approved");
        
        milestone.approved = true;
        emit MilestoneApproved(_requestId, _milestoneIndex);
    }
    
    /**
     * @dev Release funds for a milestone (can only be called by the organization)
     * @param _requestId ID of the funding request
     * @param _milestoneIndex Index of the milestone
     */
    function releaseMilestoneFunds(uint256 _requestId, uint256 _milestoneIndex) external validRequest(_requestId) {
        (address orgAddress,,,,,uint256 currentAmount,,,,,) = fundingContract.getFundingRequestDetails(_requestId);
        
        require(msg.sender == orgAddress, "Only the organization that created this request can call this function");
        require(_milestoneIndex < milestones[_requestId].length, "Invalid milestone index");
        
        Milestone storage milestone = milestones[_requestId][_milestoneIndex];
        require(milestone.approved, "Milestone not approved yet");
        require(!milestone.released, "Funds already released for this milestone");
        
        // Calculate amount to release
        uint256 amountToRelease = (currentAmount * milestone.percentage) / 10000;
        uint256 platformFee = (amountToRelease * core.platformFeePercent()) / 10000;
        uint256 orgAmount = amountToRelease - platformFee;
        
        milestone.released = true;
        
        // Transfer funds
        (bool sentOrg, ) = payable(orgAddress).call{value: orgAmount}("");
        require(sentOrg, "Failed to send funds to organization");
        
        (bool sentOwner, ) = payable(core.owner()).call{value: platformFee}("");
        require(sentOwner, "Failed to send platform fee");
        
        emit FundsReleased(_requestId, orgAddress, orgAmount);
    }
    
    /**
     * @dev Get milestones for a funding request
     * @param _requestId ID of the funding request
     * @return Array of Milestone structs
     */
    function getMilestones(uint256 _requestId) external view returns (Milestone[] memory) {
        return milestones[_requestId];
    }
    
    /**
     * @dev Process remaining funds after specified deadline (can be called by admin)
     * @param _requestId ID of the funding request
     */
    function processRemainingFunds(uint256 _requestId) public validRequest(_requestId) {
        (address orgAddress,,,,,uint256 currentAmount,,,,, bool eventCompleted) = 
            fundingContract.getFundingRequestDetails(_requestId);
        
        require(eventCompleted, "Event not marked as completed");
        require(msg.sender == core.owner() || msg.sender == orgAddress, 
                "Only owner or organization can process remaining funds");
        
        // Calculate total released funds
        uint256 totalReleased = 0;
        uint256 totalFunds = currentAmount;
        
        for (uint i = 0; i < milestones[_requestId].length; i++) {
            if (milestones[_requestId][i].released) {
                totalReleased += (totalFunds * milestones[_requestId][i].percentage) / 10000;
            }
        }
        
        // If there are unreleased funds
        uint256 remainingFunds = totalFunds - totalReleased;
        if (remainingFunds > 0) {
            bool returnToSponsors = msg.sender == core.owner();
            
            if (returnToSponsors) {
                // For simplicity, we'll send remaining funds to the core contract
                // which can then handle distribution
                (bool sent, ) = payable(address(core)).call{value: remainingFunds}("");
                require(sent, "Failed to send remaining funds");
            }
            
            emit RemainingFundsProcessed(_requestId, returnToSponsors);
        }
    }
}