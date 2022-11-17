const {
  frontEndContractsFile,
  frontEndAbiLocation,
} = require('../helper-hardhat-config')
require('dotenv').config()
const fs = require('fs')
const { network } = require('hardhat')

module.exports = async () => {
  if (process.env.UPDATE_FRONT_END) {
    console.log('Writing abis...')
    await updateAbi()
    console.log('abis written!')
  }
}

async function updateAbi() {
  const factoryNFT = await ethers.getContract('tallyFactory')
  fs.writeFileSync(
    `${frontEndAbiLocation}tallyFactory.json`,
    factoryNFT.interface.format(ethers.utils.FormatTypes.json)
  )

  const tallyNFT = await ethers.getContract('tallyNFT')
  fs.writeFileSync(
    `${frontEndAbiLocation}tallyNFT.json`,
    tallyNFT.interface.format(ethers.utils.FormatTypes.json)
  )
}

module.exports.tags = ['all', 'frontend']
