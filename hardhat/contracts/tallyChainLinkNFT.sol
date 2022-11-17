// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract tally2NFT is ChainlinkClient, ConfirmedOwner, ERC721 {
    //NFT variables
    string public constant TOKEN_URI =
        "https://nftstorage.link/ipfs/bafkreihufrdyxxjrbuqbwx7u45cpa56gjvtik66te3sqwshr22s7asvpby";
    uint256 private s_tokenCounter;

    //GET request variables
    using Chainlink for Chainlink.Request;
    bytes32 private jobId;
    uint256 private fee;

    event RequestImage(bytes32 indexed requestId, string CID);

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

    /**
     * @notice Initialize the link token and target oracle
     *
     * Mumbai Testnet details:
     * Link Token: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Oracle: 0x48e9d3Ce9E2947f41d38bBe3Ba29F7f7eC3589Dc (in Google CLoud)
     * jobId: 7e78d84cdca540b0ba8a10652d18641a
     *
     */
    constructor() ConfirmedOwner(msg.sender) ERC721("Tally", "TLY") {
        //NFT variables
        s_tokenCounter = 0;

        //GET request
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0x48e9d3Ce9E2947f41d38bBe3Ba29F7f7eC3589Dc);
        jobId = "7e78d84cdca540b0ba8a10652d18641a";

        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function requestCIDdata() public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );
        /*
        // Set the URL to perform the GET request on
        //req.add('get', 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD');
        req.add(
            "get",
            "http://api.agromonitoring.com/agro/1.0/ndvi/history?start=1662033600&end=1664971200&polyid=633f89f3a505b956ba8dbcd8&appid=e0ed9b975585c879861d8d3854b792bc"
        );

        req.add("path", "0,data,mean");
        // Multiply the result by 1000000000000000000 to remove decimals
        int256 timesAmount = 10**18;
        req.addInt("times", timesAmount);
        */
        // Sends the request
        return sendChainlinkRequest(req, fee);
    }

    /**
     * Receive the response in the form of string
     */
    function fulfill(bytes32 _requestId, string memory _CID)
        public
        recordChainlinkFulfillment(_requestId)
    {
        emit RequestImage(_requestId, _CID);
        images.push(_CID);
    }

    /**
     * Allow withdraw of Link tokens from the contract
     */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

    // ERC721 functionality
    function mintNft() public returns (uint256) {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
        return s_tokenCounter;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        // require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return TOKEN_URI;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
