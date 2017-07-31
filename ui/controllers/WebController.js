"use strict";

const Q = require('q'),
  Web3 = require('web3');

  class WebController {
  constructor(TokenVesting) {
    this.tokenVesting = TokenVesting;
  }

  index(req, res) {
    // contract.methods.lastTokenIsTransferableDate("0x7838648829eef73ada65a1659f7259ed414e22a2").call({from: "0x7838648829eef73ada65a1659f7259ed414e22a2"}).then((result) => {
    //   console.log(222, result);
    // });
    return res.render('index');
  }
}

module.exports = WebController;