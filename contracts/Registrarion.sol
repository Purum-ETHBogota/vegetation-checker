// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Registration {
    event RegisterNewLand(address indexed wallet, bytes32 nullifierHash, bytes16 coordinatesHash);

    mapping(address => bytes16) public mapMD5;


    function RegisterLand(address _wallet, bytes32 _nullifierHash, bytes16 _coordinateHash) public {
        emit RegisterNewLand(_wallet, _nullifierHash, _coordinateHash);
        mapMD5[_wallet]=_coordinateHash;
    }
}