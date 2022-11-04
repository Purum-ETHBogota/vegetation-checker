// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "./PurumNFT.sol";

contract FactoryNFTPurum {
    event NFTCreated(address indexed NFTAddress);

    ///@notice In this array the classrooms will be stored
    PurumNFT[] public nftsArray;

    function createNFT() public {
        PurumNFT nft = (new PurumNFT)();
        nftsArray.push(nft);

        emit NFTCreated(address(nftsArray[nftsArray.length - 1]));
    }

    function getLinkFromNFTS(uint256 _index) public {
        PurumNFT nft = nftsArray[_index];
        nft.withdrawLink();
    }

    function getTotalNFTS() public view returns (uint count) {
        return nftsArray.length;
    }
}