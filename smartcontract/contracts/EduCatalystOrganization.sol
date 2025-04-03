// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Educatalyst.sol";

/**
 * @title EduCatalystOrganization
 * @dev Manages organization registrations and verifications
 */
contract EduCatalystOrganization {
    EduCatalystCore public core;
    
    enum OrganizationStatus { Unverified, BasicVerification, FullVerification }
    
    struct Organization {
        address payable orgAddress;
        string name;
        string description;
        string website;
        string socialMedia;
        OrganizationStatus verificationStatus;
        bool exists;
    }
    
    mapping(address => Organization) public organizations;
    address[] public registeredOrgs;
    
    event OrganizationRegistered(address indexed orgAddress, string name);
    event OrganizationVerified(address indexed orgAddress, OrganizationStatus status);
    
    modifier onlyOwner() {
        require(msg.sender == core.owner(), "Only owner can call this function");
        _;
    }
    
    constructor(address _coreAddress) {
        core = EduCatalystCore(_coreAddress);
    }
    
    /**
     * @dev Register a new organization on the platform
     * @param _name Name of the organization
     * @param _description Brief description of the organization
     * @param _website Website URL
     * @param _socialMedia Social media handles (comma separated)
     */
    function registerOrganization(
        string memory _name,
        string memory _description,
        string memory _website,
        string memory _socialMedia
    ) external {
        require(!organizations[msg.sender].exists, "Organization already registered");

        organizations[msg.sender] = Organization({
            orgAddress: payable(msg.sender),
            name: _name,
            description: _description,
            website: _website,
            socialMedia: _socialMedia,
            verificationStatus: OrganizationStatus.Unverified,
            exists: true
        });

        registeredOrgs.push(msg.sender);
        emit OrganizationRegistered(msg.sender, _name);
    }
    
    /**
     * @dev Update organization verification status (only owner)
     * @param _orgAddress Address of the organization
     * @param _status New verification status
     */
    function updateOrganizationStatus(address _orgAddress, OrganizationStatus _status) external onlyOwner {
        require(organizations[_orgAddress].exists, "Organization does not exist");
        organizations[_orgAddress].verificationStatus = _status;
        emit OrganizationVerified(_orgAddress, _status);
    }
    
    /**
     * @dev Check if an address is a registered organization
     * @param _address The address to check
     * @return Whether the address is a registered organization
     */
    function isOrganization(address _address) external view returns (bool) {
        return organizations[_address].exists;
    }
    
    /**
 * @dev Get organization details
 * @param _address The organization address
 * @return name The name of the organization
 * @return description The description of the organization
 * @return website The website URL of the organization
 * @return socialMedia The social media handles of the organization
 * @return status The verification status of the organization
 * @return exists Whether the organization exists
 */
    function getOrganizationDetails(address _address) external view returns (
        string memory name,
        string memory description,
        string memory website,
        string memory socialMedia,
        OrganizationStatus status,
        bool exists
    ) {
        Organization storage org = organizations[_address];
        return (
            org.name,
            org.description,
            org.website,
            org.socialMedia,
            org.verificationStatus,
            org.exists
        );
    }
    
    /**
     * @dev Get list of all registered organizations
     * @return Array of organization addresses
     */
    function getAllOrganizations() external view returns (address[] memory) {
        return registeredOrgs;
    }
}