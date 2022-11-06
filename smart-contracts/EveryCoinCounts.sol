// SPDX-License-Identifier: GPL-3.0

/// @title Solution to support institutions to help important causes providing access to the web3 space.
/// @author Alexandre Barros and Alexei Pancratov
/// @notice This contract was buit during the ETH San Francisco event in Nov 2022
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract.


import "https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/oracle/interfaces/OptimisticOracleV2Interface.sol";


pragma solidity ^0.8.7;

contract EveryCoinCounts {

    address owner;
    bool locked;

    uint256 public institutionsCounter;
    uint256 public donatorsCounter;
    uint256 public donationsCounter;

    struct donator{
        uint256 idDonator;
        uint256 donations;
        uint256 totalDonated;
    }

    struct institution{
        uint256 idInstitution;
        uint256 donations;
        uint256 totalBalance;
        int256 unreliable;
    }

    struct donation{
        uint256 idDonation;
        uint256 timestamp;
        address donator; 
        uint256 institution; 
        uint256 value; 
        string donatorName;
        string message;
    }
    
    event donationReceipt(
        uint256 indexed _timestamp, 
        address indexed _donator, 
        string indexed _institution,  
        uint256 _value,
        string _donatorName,
        string _message
    );

    event fundsTransfer(
        uint256 indexed _timestamp, 
        string indexed _institution,
        address indexed _to,  
        uint256 _amount,
        string _message
    );

    mapping(string => institution) public institutions;
    mapping(address => donator) public donators; 

    // Creates an Optimistic Oracle instance at the deployed address on Goerli.
    OptimisticOracleV2Interface oo = OptimisticOracleV2Interface(0xA5B9d8a0B0Fa04Ba71BDD68069661ED5C0848884);
    bytes32 identifier = bytes32("YES_OR_NO_QUERY");
    bytes ancillaryData = bytes("Should this institution be stopped from realizing transactions? (1) YES | (0) NO");
    uint256 requestTime = 0; // Store the request time so we can re-use it later.


    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner (){
        require (msg.sender == owner , "Only owner is allowed!");
        _;
    }

    modifier nonReentrant() {
        require (!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }

    /// @notice Returns if the institution is trustworth and ...
    /// @dev Returns only a fixed number. (this is a COMMENT EXAMPLE)
    function countTheseCoins(string memory _institution, string memory _donatorName, string memory _message) public payable {
        
        require (msg.value >= 1 , "You need to donate at least 1 wei!");
        
        // Update Donations Counter
        donationsCounter ++;

        address _donator = msg.sender;

        // Update Institution Structure
        if (institutions[_institution].donations == 0) {institutionsCounter ++;}
        institutions[_institution].idInstitution = institutionsCounter ;
        institutions[_institution].donations ++;
        institutions[_institution].totalBalance += msg.value ;
     
        // Update Donator Structure
        if (donators[_donator].donations == 0) {donatorsCounter ++;}
        donators[_donator].idDonator = donatorsCounter ;
        donators[_donator].donations ++;
        donators[_donator].totalDonated += msg.value ;

        // Emit the Event Log
        emit donationReceipt(
            block.timestamp, 
            _donator, 
            _institution, 
            msg.value,
            _donatorName,
            _message
        );

    }

    function transfer(string memory _institution , address _to, uint256 _amount, string memory _message) public onlyOwner{

	    require (institutions[_institution].totalBalance >= _amount, "No balance for the institution");
        require (institutions[_institution].unreliable == 0 , "This institution was marked as unreliable in realizing transactions.");
        
        requestData(); // propose to UMA Comunity to evaluate if the institution still reliable

        institutions[_institution].unreliable = getSettledData();
        require (institutions[_institution].unreliable == 0 , "This institution was marked as unreliable in realizing transactions.");

        institutions[_institution].totalBalance -= _amount;
        payable(_to).transfer(_amount);

        emit fundsTransfer(
            block.timestamp, 
            _institution,
            _to,  
            _amount,
            _message
        );
    }

    // Submit a data request (requestData) to the Optimistic Oracle. 
    function requestData() internal { 
        
        requestTime = block.timestamp;  // Set the request time to the current block time.
        IERC20 bondCurrency = IERC20 (0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6);
        uint256 reward = 0; // Set the reward to 0 (so we dont have to fund it from this contract).

        // Now, we make the data request to the Optimistic Oracle and set the liveness to 30 sec.
        oo.requestPrice(identifier, requestTime, ancillaryData, bondCurrency, reward);
        oo.setCustomLiveness(identifier, requestTime, ancillaryData, 30);
        // setCallbacks
    }

    // Settle the request once it's gone through the liveness period of 30 seconds.
    // In a real world use of the Optimistic Oracle this should be longer to give time to disputers
    function settleRequest() internal {
        oo.settle(address(this), identifier, requestTime, ancillaryData);
    }

    // Fetch the resolved price from the Optimistic Oracle that was settled.
    function getSettledData() internal view returns (int256){
        return oo.getRequest(address(this), identifier, requestTime, ancillaryData).resolvedPrice;
    }

    receive() external payable {
            // React to receiving ether
    }

    fallback() external payable {
        //dataSettled();
    }

}