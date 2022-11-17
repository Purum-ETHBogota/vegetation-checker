const networkConfig = {
  default: {
    name: 'hardhat',
    keepersUpdateInterval: '30',
  },
  31337: {
    name: 'localhost',
    subscriptionId: '588',
    gasLane:
      '0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc', // 30 gwei
  },
  4: {
    name: 'rinkeby',
    subscriptionId: '588',
    gasLane:
      '0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc', // 30 gwei
  },
  1: {
    name: 'mainnet',
    keepersUpdateInterval: '30',
  },
  80001: {
    name: 'mumbai',
    keepersUpdateInterval: '30',
  },
}

const developmentChains = ['hardhat', 'localhost']
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const frontEndContractsFile = '../constants/adresses.json' //We are not updating the adresses automatically right now
const frontEndAbiLocation = '../constants/'

module.exports = {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
  frontEndContractsFile,
  frontEndAbiLocation,
}
