"use strict";

//External
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

//Controllers
const WebController = require('./WebController'),
  TokenVestingController = require('./TokenVestingController');

//Config
const config = require('../config');


module.exports = {
  web: new WebController(),
  tokenVesting: new TokenVestingController(web3, config.abi())
};
