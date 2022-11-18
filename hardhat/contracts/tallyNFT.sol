// SPDX-License-Identifier: MIT
// block-farms.io
// Discord=https://discord.gg/PgxRVrDUm7

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract tallyNFT is ChainlinkClient, ERC721 {
    using Chainlink for Chainlink.Request;
    //Chainlink
    string public stringVariable;
    bytes32 private externalJobId;
    uint256 private oraclePayment;

    //NFT
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
        //coordinates
        coord1 = _coord1;
        coord2 = _coord2;
        coord3 = _coord3;

        //NFT variables
        s_tokenCounter = 0;

        //Chainlink
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0xc30424976eCd71bfb50F5b2233B62De6A3AaA3d1);
        externalJobId = "057684b91dcc415d82423de1058fcbad";
        oraclePayment = (1 * LINK_DIVISIBILITY) / 10; // n * 10**18
    }

    function requestString(string memory _polyid) public {
        Chainlink.Request memory req = buildChainlinkRequest(
            externalJobId,
            address(this),
            this.fulfillString.selector
        );
        //req.add("get", "https://API_endpoint_url");
        //req.add("path1", "data,results");
        req.add("polyid", _polyid);
        sendOperatorRequest(req, oraclePayment);
    }

    event RequestFulfilled(
        bytes32 indexed requestId,
        string indexed stringVariable
    );

    function fulfillString(bytes32 requestId, string calldata _stringVariable)
        public
        recordChainlinkFulfillment(requestId)
    {
        emit RequestFulfilled(requestId, _stringVariable);
        stringVariable = _stringVariable;
        images.push(stringVariable);
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
