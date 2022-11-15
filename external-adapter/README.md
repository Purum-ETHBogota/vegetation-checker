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

4. Call the external adapter/API server

```bash
curl -X POST -H "content-type:application/json" "http://localhost:8080/" --data '{ "id": 0 }'
```
