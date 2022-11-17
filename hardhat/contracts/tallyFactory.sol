// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "./tallyNFT.sol";

contract tallyFactory {
    event NFTCreated(address indexed NFTAddress);

    ///@notice In this array the different projects will be stored
    tallyNFT[] public nftsArray;

    function createNFT(
        int256 _coord1,
        int256 _coord2,
        int256 _coord3
    ) public {
        tallyNFT nft = (new tallyNFT)(_coord1, _coord2, _coord3);
        nftsArray.push(nft);

        emit NFTCreated(address(nftsArray[nftsArray.length - 1]));
    }

    function getTotalNFTS() public view returns (uint count) {
        return nftsArray.length;
    }
}
