const { Requester, Validator } = require('@chainlink/external-adapter')
require('dotenv').config()

//Packages to download the image
const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')

//Packages to upload the image to IPFS
const { NFTStorage } = require('nft.storage')
const { filesFromPath } = require('files-from-path')

//NFTStorage token
const token = process.env.NFT_STORAGE_API_KEY

// Define custom error scenarios for the API.
// Return true for the adapter to retry.
const customError = (data) => {
  if (data.Response === 'Error') return true
  return false
}

// Define custom parameters to be used by the adapter.
// Extra parameters can be stated in the extra object,
// with a Boolean value indicating whether or not they
// should be required.
const customParams = {
  polyid: ['polyid'],
}

const createRequest = (input, callback) => {
  // The Validator helps you validate the Chainlink request data
  const validator = new Validator(callback, input)
  const jobRunID = validator.validated.id
  const polyid = validator.input.data.polyid

  const start = '1662033600'
  const end = '1664971200'
  const appid = process.env.AGRO_API_KEY

  //const url = 'https://api.agromonitoring.com/agro/1.0/image/search?'
  const url = `http://api.agromonitoring.com/agro/1.0/image/search?start=1662033600&end=1664971200&polyid=${polyid}&appid=${appid}`

  console.log(`This is the polyid: ${polyid} `)
  console.log('This is the validator: ' + JSON.stringify(validator))
  //console.log('This is the polyid: ' + validator.validated.data.polyid)
  //console.log('This is the customParams value: ' + JSON.stringify(customParams))

  const params = {
    // polyid,
    appid,
  }

  // const headers = {
  //   "Authorization": `Cryptum-Token ${API_KEY}`
  // }

  // This is where you would add method and headers
  // you can add method like GET or POST and add it to the config
  // The default is GET requests
  // method = 'get'
  // headers = 'headers.....'
  const config = {
    url,
    // params
  }

  // The Requester allows API calls be retry in case of timeout
  // or connection failure
  Requester.request(config, customError)
    .then((response) => {
      // It's common practice to store the desired value at the top-level
      // result key. This allows different adapters to be compatible with
      // one another.

      const link = Requester.getResult(response.data, [
        '0',
        'image',
        'truecolor',
      ])

      //Now we download the image:
      downloadImage(link)

      // And store in IPFS:
      storeDirectory(response, callback, jobRunID)
    })
    .catch((error) => {
      callback(500, Requester.errored(jobRunID, error))
    })
}

async function downloadImage(_url) {
  const url = _url
  const path = Path.resolve(__dirname, 'images', 'sat0.jpg')
  const writer = Fs.createWriteStream(path)

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream',
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

async function storeDirectory(_response, _callback, _jobRunID) {
  await delay(3000)
  const directoryPath = './images/'
  const files = filesFromPath(directoryPath, {
    pathPrefix: Path.resolve(directoryPath), // see the note about pathPrefix below
    hidden: true, // use the default of false if you want to ignore files that start with '.'
  })

  const storage = new NFTStorage({ token })

  console.log(`storing file(s) from ${Path}`)
  const cid = await storage.storeDirectory(files)
  console.log({ cid })

  const status = await storage.status(cid)
  console.log(status)
  console.log(status['cid'])

  _response.data.result = status['cid']
  _callback(_response.status, Requester.success(_jobRunID, _response))
}

// This is a wrapper to allow the function to work with
// GCP Functions
exports.gcpservice = (req, res) => {
  createRequest(req.body, (statusCode, data) => {
    res.status(statusCode).send(data)
  })
}

// This is a wrapper to allow the function to work with
// AWS Lambda
exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data)
  })
}

// This is a wrapper to allow the function to work with
// newer AWS Lambda implementations
exports.handlerv2 = (event, context, callback) => {
  createRequest(JSON.parse(event.body), (statusCode, data) => {
    callback(null, {
      statusCode: statusCode,
      body: JSON.stringify(data),
      isBase64Encoded: false,
    })
  })
}

// This allows the function to be exported for testing
// or for running in express
module.exports.createRequest = createRequest
