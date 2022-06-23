//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SampleToken {

    string private _name;
    string private _symbol;
    address private owner;
    
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    
    constructor(string memory name, string memory symbol, uin256 initialSupply, uint maxSupply) {
        owner = message.sender;
    }
    
    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {}

    function totalSupply() public view returns (uint256) {}

    function balanceOf(address _owner) public view returns (uint256 balance) {}

    function transfer(address _to, uint256 _value) public returns (bool success) {}

    function approve(address _spender, uint256 _value) public returns (bool success) {}

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {}



