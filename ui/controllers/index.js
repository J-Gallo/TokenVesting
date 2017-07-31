"use strict";

//External
const Web3 = require('web3');

//Controllers
const WebController = require('./WebController'),
  TokenVestingController = require('./TokenVestingController');

//Config
const config = require('../config');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

module.exports = {
  web: new WebController(new TokenVestingController(web3, config.abi())),
  tokenVesting: new TokenVestingController(web3, config.abi())
};
