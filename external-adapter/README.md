# Chainlink NodeJS External Adapter

We used the template at this [link](https://github.com/thodges-gh/CL-EA-NodeJS-Template) to make our external adapter. This external adapter dowloads an image in the `images` directory from a satellite API (agromonitoring.com), stores it in IPFS using nft.storage and returns the CID to the contract that called it.

## To run locally

1. Create a `.env` file with the api keys from [nft.storage](https://nft.storage/) and [agromonitoring](https://agromonitoring.com/api), an example is provided in the `.env.example` file

2. Install dependencies:

```bash
yarn
```

3. Start the server

```bash
yarn start
```

4. Call the external adapter/API server. We need to pass the polyid paramenter to the function in order to work. The polyid is an identifier tha the API use to identify registered polygons we will be using this sample polyid: _633f89f3a505b956ba8dbcd8_, but you can create your own in the [website](https://agromonitoring.com/api).

```bash
curl -X POST -H "content-type:application/json" "http://localhost:8080/" --data '{ "id": 0, "data":{"polyid":"633f89f3a505b956ba8dbcd8"} }'
```
