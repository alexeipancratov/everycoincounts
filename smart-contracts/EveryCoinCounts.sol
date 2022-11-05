// SPDX-License-Identifier: GPL-3.0

/// @title Solution to support institutions to help important causes providing access to the web3 space.
/// @author Alexandre Barros and Alexei Pancratov
/// @notice This contract was buit during the ETH San Francisco event in Nov 2022
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract.

pragma solidity ^0.8.7;

contract EveryCoinCounts {

    address owner;
    uint256 public coinPrice;

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
    }

    struct donation{
        uint256 idDonation;
        uint256 timestamp;
        address donator; 
        uint256 institution; 
        uint256 slices; 
        uint256 slicePrice;
        string donatorName;
        string message;
    }

    event newInstitution(
        uint256 indexed timestamp,
        uint256 indexed _creator
    );
    
    event donationReceipt(
        uint256 indexed _timestamp, 
        address indexed _donator, 
        string indexed _institution, 
        uint256 _slices, 
        uint256 _slicePrice,
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

    event newCoinPrice(
        uint256 indexed timestamp,
        uint256 indexed _coinPrice
    );

    mapping(string => institution) public institutions;
    mapping(address => donator) public donators;

    // Top Donators
    address[10] topDonators;    

    constructor(){
        owner = msg.sender;
        coinPrice = 1 ;  //gwei
        // maxDonation = 100 ;
        // fee = 10 ;
    }

    modifier onlyOwner (){
        require (msg.sender == owner , "Only owner is allowed!");
        _;
    }

    /// @notice Returns the amount of leaves the tree has.
    /// @dev Returns only a fixed number.
    function changeCoinPrice(uint256 _newPrice) public onlyOwner{
        coinPrice = _newPrice ;  //wei

        emit newCoinPrice(
            block.timestamp,
            coinPrice
        );
    }

    function countThisCoins(string memory _institution, uint256 _coins, string memory _donatorName, string memory _message) public payable {
        
        // Verify enough balance to buy slices
        require (msg.value >= _coins * coinPrice , "Not enought balance to buy slices!");
        
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
            _coins, 
            coinPrice,
            _donatorName,
            _message
        );

    }

    function transfer(string memory _institution , address _to, uint256 _amount, string memory _message) public onlyOwner{
        // Verify enough balance to transfer
	    require (institutions[_institution].totalBalance >= _amount, "No balance for the creator");
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

    function transferAll(string memory _institution , address _to) public onlyOwner{
        // Verify enough balance to transfer
	    require (institutions[_institution].totalBalance > 0 , "No balance for the creator");
        uint256 balance = institutions[_institution].totalBalance;
        institutions[_institution].totalBalance = 0;
        payable(_to).transfer(balance);
	}

    receive() external payable {
            // React to receiving ether
    }

    fallback() external payable {

    }

}