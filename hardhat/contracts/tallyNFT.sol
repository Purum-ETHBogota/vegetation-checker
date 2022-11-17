// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract tallyNFT is ERC721 {
    //NFT variables
    string public constant TOKEN_URI =
        "https://nftstorage.link/ipfs/bafkreihufrdyxxjrbuqbwx7u45cpa56gjvtik66te3sqwshr22s7asvpby";
    uint256 private s_tokenCounter;

    //GeoNFT data
    //In this array we will store the CIDs of the images:
    string[] public images;
    //This is the score calculated by bacalhau
    uint256 public score;
    //This is an array with the output data from bacalhau
    string[] public bacOutput;
    //Coordinates
    int256 public coord1;
    int256 public coord2;
    int256 public coord3;

    constructor(
        int256 _coord1,
        int256 _coord2,
        int256 _coord3
    ) ERC721("Tally", "TLY") {
        //NFT variables
        s_tokenCounter = 0;
        coord1 = _coord1;
        coord2 = _coord2;
        coord3 = _coord3;
    }

    // ERC721 functionality
    function mintNft() public returns (uint256) {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
        return s_tokenCounter;
    }

    function tokenURI(uint256 tokenId)
        public
        pure
        override
        returns (string memory)
    {
        // require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return TOKEN_URI;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }

    function mockChainlinkResp(string memory _response) public {
        //test string that the chainlink external adapter already uploaded to IPFS:
        // "bafybeiftkyrr2bmm5qdie3sl2dyodlv23erckcr5dnkzrj3sqomotivxii"

        images.push(_response);
    }

    function storeBacalhauScore(uint256 _score) public {
        score = _score;
    }

    function storeBacalhauOutput(string memory _outputCID) public {
        bacOutput.push(_outputCID);
    }
}
