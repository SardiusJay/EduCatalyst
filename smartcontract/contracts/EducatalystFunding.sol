// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Educatalyst.sol";
import "./EduCatalystOrganization.sol";

/**
 * @title EduCatalystFunding
 * @dev Manages funding requests and contributions
 */
contract EduCatalystFunding {
    EduCatalystCore public core;
    EduCatalystOrganization public organizationContract;
    
    enum FundingStatus { Active, Funded, PartiallyFunded, Refunded, Canceled }
    
    struct FundingRequest {
        uint256 id;
        address payable orgAddress;
        string title;
        string description;
        uint256 fundingGoal;
        uint256 minimumThreshold; // Minimum acceptable funding percentage (in basis points)
        uint256 currentAmount;
        uint256 deadline;
        uint256 eventStart;
        uint256 eventEnd;
        FundingStatus status;
        address[] sponsors;
        mapping(address => uint256) contributions;
        bool eventCompleted; // Flag to mark if the event has been completed
        bool exists;
    }
    
    mapping(uint256 => FundingRequest) public fundingRequests;
    uint256 public requestCount;
    
    event FundingRequestCreated(uint256 indexed requestId, address indexed orgAddress, uint256 fundingGoal, uint256 deadline);
    event ContributionMade(uint256 indexed requestId, address indexed sponsor, uint256 amount);
    event FundingGoalReached(uint256 indexed requestId);
    event FundingRequestCanceled(uint256 indexed requestId);
    event RefundIssued(uint256 indexed requestId, address indexed sponsor, uint256 amount);
    event PartialFundingAccepted(uint256 indexed requestId, uint256 amount);
    event FundingDecisionRequired(uint256 indexed requestId, uint256 currentAmount, uint256 fundingGoal);
    event FundingDecisionMade(uint256 indexed requestId, bool proceedWithEvent);
    event EventCompleted(uint256 indexed requestId, uint256 timestamp);
    event EventVerified(uint256 indexed requestId, bool success);
    
    modifier onlyOrganization() {
        require(organizationContract.isOrganization(msg.sender), "Only registered organizations can call this function");
        _;
    }
    
    modifier validRequest(uint256 requestId) {
        require(fundingRequests[requestId].exists, "Funding request does not exist");
        _;
    }
    
    modifier onlyRequestOrg(uint256 requestId) {
        require(fundingRequests[requestId].orgAddress == msg.sender, "Only the organization that created this request can call this function");
        _;
    }
    
    constructor(address _coreAddress, address _organizationAddress) {
        core = EduCatalystCore(_coreAddress);
        organizationContract = EduCatalystOrganization(_organizationAddress);
        requestCount = 0;
    }
    
    /**
     * @dev Create a new funding request
     * @param _title Title of the funding request
     * @param _description Description of the event/program
     * @param _fundingGoal Total amount needed
     * @param _minimumThreshold Minimum acceptable percentage (in basis points)
     * @param _deadline Deadline for funding
     * @param _eventStart Start date of the event
     * @param _eventEnd End date of the event
     */
    function createFundingRequest(
        string memory _title,
        string memory _description,
        uint256 _fundingGoal,
        uint256 _minimumThreshold,
        uint256 _deadline,
        uint256 _eventStart,
        uint256 _eventEnd
    ) external onlyOrganization {
        require(_minimumThreshold <= 10000, "Threshold cannot exceed 100%");
        require(_deadline > block.timestamp, "Deadline must be in the future");
        require(_eventStart >= _deadline, "Event must start after funding deadline");
        require(_eventEnd > _eventStart, "Event end must be after start");

        requestCount++;
        uint256 requestId = requestCount;
        
        FundingRequest storage newRequest = fundingRequests[requestId];
        newRequest.id = requestId;
        newRequest.orgAddress = payable(msg.sender);
        newRequest.title = _title;
        newRequest.description = _description;
        newRequest.fundingGoal = _fundingGoal;
        newRequest.minimumThreshold = _minimumThreshold;
        newRequest.currentAmount = 0;
        newRequest.deadline = _deadline;
        newRequest.eventStart = _eventStart;
        newRequest.eventEnd = _eventEnd;
        newRequest.status = FundingStatus.Active;
        newRequest.exists = true;
        newRequest.eventCompleted = false;
        
        emit FundingRequestCreated(requestId, msg.sender, _fundingGoal, _deadline);
    }
    
    /**
     * @dev Get all funding request IDs created by the calling organization
     * @return Array of request IDs
     */
    function getMyRequestIds() external view returns (uint256[] memory) {
        uint256[] memory myRequests = new uint256[](requestCount);
        uint256 resultCount = 0;
        
        for (uint256 i = 1; i <= requestCount; i++) {
            if (fundingRequests[i].exists && fundingRequests[i].orgAddress == msg.sender) {
                myRequests[resultCount] = i;
                resultCount++;
            }
        }
        
        // Create correctly sized array with just the organization's requests
        uint256[] memory result = new uint256[](resultCount);
        for (uint256 i = 0; i < resultCount; i++) {
            result[i] = myRequests[i];
        }
        
        return result;
    }
    
    /**
     * @dev Contribute funds to a funding request
     * @param _requestId ID of the funding request
     */
    function contribute(uint256 _requestId) external payable validRequest(_requestId) {
        FundingRequest storage request = fundingRequests[_requestId];
        
        require(request.status == FundingStatus.Active, "Funding is not active");
        require(block.timestamp < request.deadline, "Funding deadline has passed");
        require(msg.value > 0, "Contribution must be greater than 0");
        
        // Add sponsor to list if first contribution
        if (request.contributions[msg.sender] == 0) {
            request.sponsors.push(msg.sender);
        }
        
        // Update contribution
        request.contributions[msg.sender] += msg.value;
        request.currentAmount += msg.value;
        
        emit ContributionMade(_requestId, msg.sender, msg.value);
        
        // Check if funding goal reached
        if (request.currentAmount >= request.fundingGoal) {
            request.status = FundingStatus.Funded;
            emit FundingGoalReached(_requestId);
        }
    }
    
    /**
     * @dev Cancel a funding request (only the organization that created it)
     * @param _requestId ID of the funding request
     */
    function cancelFundingRequest(uint256 _requestId) external validRequest(_requestId) onlyRequestOrg(_requestId) {
        FundingRequest storage request = fundingRequests[_requestId];
        
        require(request.status == FundingStatus.Active, "Cannot cancel a request that isn't active");
        request.status = FundingStatus.Canceled;
        
        // Refund all sponsors
        for (uint i = 0; i < request.sponsors.length; i++) {
            address sponsor = request.sponsors[i];
            uint256 amount = request.contributions[sponsor];
            if (amount > 0) {
                request.contributions[sponsor] = 0;
                (bool sent, ) = payable(sponsor).call{value: amount}("");
                require(sent, "Failed to send refund");
                emit RefundIssued(_requestId, sponsor, amount);
            }
        }
        
        emit FundingRequestCanceled(_requestId);
    }
    
    /**
     * @dev Check if funding decision is required (event date approaching but funding incomplete)
     * @param _requestId ID of the funding request
     */
    function checkFundingDecisionRequired(uint256 _requestId) public validRequest(_requestId) {
        FundingRequest storage request = fundingRequests[_requestId];
        
        // Only check active requests approaching their event start date
        if (request.status == FundingStatus.Active && 
            block.timestamp >= request.deadline && 
            block.timestamp < request.eventStart &&
            request.currentAmount < request.fundingGoal) {
                
            emit FundingDecisionRequired(_requestId, request.currentAmount, request.fundingGoal);
        }
    }
    
    /**
     * @dev Make a decision about proceeding with event despite incomplete funding
     * @param _requestId ID of the funding request
     * @param _proceedWithEvent Whether to proceed with the event using current funds
     */
    function makeFundingDecision(uint256 _requestId, bool _proceedWithEvent) external validRequest(_requestId) onlyRequestOrg(_requestId) {
        FundingRequest storage request = fundingRequests[_requestId];
        
        // Can only decide on active requests past their deadline but before event starts
        require(request.status == FundingStatus.Active, "Request is not active");
        require(block.timestamp >= request.deadline, "Funding deadline has not passed yet");
        require(block.timestamp < request.eventStart, "Event has already started");
        require(request.currentAmount < request.fundingGoal, "Funding goal already met");
        
        if (_proceedWithEvent) {
            // Check if minimum threshold is met
            uint256 fundingPercentage = (request.currentAmount * 10000) / request.fundingGoal;
            require(fundingPercentage >= request.minimumThreshold, "Current funding does not meet minimum threshold");
            
            // Accept partial funding
            request.status = FundingStatus.PartiallyFunded;
            emit PartialFundingAccepted(_requestId, request.currentAmount);
        } else {
            // Cancel event and refund all sponsors
            request.status = FundingStatus.Canceled;
            
            // Refund all sponsors
            for (uint i = 0; i < request.sponsors.length; i++) {
                address sponsor = request.sponsors[i];
                uint256 amount = request.contributions[sponsor];
                if (amount > 0) {
                    request.contributions[sponsor] = 0;
                    (bool sent, ) = payable(sponsor).call{value: amount}("");
                    require(sent, "Failed to send refund");
                    emit RefundIssued(_requestId, sponsor, amount);
                }
            }
            
            emit FundingRequestCanceled(_requestId);
        }
        
        emit FundingDecisionMade(_requestId, _proceedWithEvent);
    }
    
    /**
     * @dev Process funding requests that are past deadline but have not had decisions made
     * @param _requestId ID of the funding request
     */
    function autoProcessExpiredFunding(uint256 _requestId) external validRequest(_requestId) {
        FundingRequest storage request = fundingRequests[_requestId];
        
        // Only process active requests past their event start date (meaning no decision was made)
        require(request.status == FundingStatus.Active, "Request is not active");
        require(block.timestamp >= request.eventStart, "Event has not started yet");
        
        // Automatically cancel and refund
        request.status = FundingStatus.Canceled;
        
        // Refund all sponsors
        for (uint i = 0; i < request.sponsors.length; i++) {
            address sponsor = request.sponsors[i];
            uint256 amount = request.contributions[sponsor];
            if (amount > 0) {
                request.contributions[sponsor] = 0;
                (bool sent, ) = payable(sponsor).call{value: amount}("");
                require(sent, "Failed to send refund");
                emit RefundIssued(_requestId, sponsor, amount);
            }
        }
        
        emit FundingRequestCanceled(_requestId);
        emit FundingDecisionMade(_requestId, false);
    }
    
    /**
     * @dev Mark an event as completed (only the organization that created it)
     * @param _requestId ID of the funding request
     * @param _success Whether the event was successfully completed
     * @param _evidenceUri URI or hash pointing to evidence of completion (could be IPFS)
     */
    function markEventCompleted(uint256 _requestId, bool _success, string memory _evidenceUri) external validRequest(_requestId) onlyRequestOrg(_requestId) {
        FundingRequest storage request = fundingRequests[_requestId];
        
        require(block.timestamp >= request.eventEnd, "Event end date has not passed yet");
        require(!request.eventCompleted, "Event already marked as completed");
        require(request.status == FundingStatus.Funded || request.status == FundingStatus.PartiallyFunded, 
                "Request must be funded to mark as completed");
        
        request.eventCompleted = true;
        
        emit EventCompleted(_requestId, block.timestamp);
        emit EventVerified(_requestId, _success);
    }
    
    /**
     * @dev Get list of sponsors for a funding request
     * @param _requestId ID of the funding request
     * @return Array of sponsor addresses
     */
    function getSponsors(uint256 _requestId) external view validRequest(_requestId) returns (address[] memory) {
        return fundingRequests[_requestId].sponsors;
    }
    
    /**
     * @dev Get contribution amount for a specific sponsor
     * @param _requestId ID of the funding request
     * @param _sponsor Address of the sponsor
     * @return Contribution amount
     */
    function getContribution(uint256 _requestId, address _sponsor) external view validRequest(_requestId) returns (uint256) {
        return fundingRequests[_requestId].contributions[_sponsor];
    }
    
    /**
     * @dev Get funding request details
     * @param _requestId ID of the funding request
     */
    function getFundingRequestDetails(uint256 _requestId) external view validRequest(_requestId) returns (
        address orgAddress,
        string memory title,
        string memory description,
        uint256 fundingGoal,
        uint256 minimumThreshold,
        uint256 currentAmount,
        uint256 deadline,
        uint256 eventStart,
        uint256 eventEnd,
        FundingStatus status,
        bool eventCompleted
    ) {
        FundingRequest storage request = fundingRequests[_requestId];
        return (
            request.orgAddress,
            request.title,
            request.description,
            request.fundingGoal,
            request.minimumThreshold,
            request.currentAmount,
            request.deadline,
            request.eventStart,
            request.eventEnd,
            request.status,
            request.eventCompleted
        );
    }
    
    /**
     * @dev Check if an event has passed its end date but not been marked as completed
     * @param _requestId ID of the funding request
     * @return bool True if the event has passed but not been marked as completed
     */
    function isEventOverdue(uint256 _requestId) external view validRequest(_requestId) returns (bool) {
        FundingRequest storage request = fundingRequests[_requestId];
        return block.timestamp > request.eventEnd && !request.eventCompleted &&
               (request.status == FundingStatus.Funded || request.status == FundingStatus.PartiallyFunded);
    }
}