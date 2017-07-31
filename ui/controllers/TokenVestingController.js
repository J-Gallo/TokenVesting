"use strict";

class TokenVestingController {
  constructor(web3, abi) {
    this.web3 = web3;
    this.abi = abi;
    this.contractAddress = '0xcc91c8475f09f977225c318d321706d7d83057bd';
    this.contract = new web3.eth.Contract(this.abi, this.contractAddress);
  }

  grantVestedTokens(req, res) {
    const body = req.body;
    if (body && body.to && body.value && body.start && body.cliff && body.vesting && body.revokable && body.burnsOnRevoke) {
      const contract = this.contract;

      console.log(req.body);
      contract.methods.grantVestedTokens(
        req.body.to,
        req.body.value,
        req.body.start,
        req.body.cliff,
        req.body.vesting,
        req.body.revokable,
        req.body.burnsOnRevoke).send({from: "0x7838648829eef73ada65a1659f7259ed414e22a2", gas: 500000}).then((result) => {
        return res.send(result);
      }).catch(() => {
        return res.sendStatus(500);
      });
    } else {
      return res.sendStatus(400);
    }
  }

  _createContract(address) {
    const contract = new this.web3.eth.Contract(this.abi, address);

    return contract;
  }

  lastTokenIsTransferableDate(req, res) {
    if (req.body && req.body.holder) {
      this.contract.methods.lastTokenIsTransferableDate(req.body.holder).call({from: "0x7838648829eef73ada65a1659f7259ed414e22a2"}).then((result) => {
        console.log(222, result);
        return res.send(result);
      }).catch(() => {
        return res.sendStatus(500);
      });
    } else {
      return res.sendStatus(400);
    }
  }

  tokenGrantsCount(req, res) {
    if (req.body && req.body.holder) {
      this.contract.methods.tokenGrantsCount(req.body.holder).call({from: "0x7838648829eef73ada65a1659f7259ed414e22a2"}).then((result) => {
        console.log(111, result);
        return res.send(result);
      }).catch(() => {
        return res.sendStatus(500);
      })
    } else {
      return res.sendStatus(400);
    }
  }

  getTokenGrant(req, res) {
    if (req.body && req.body.holder && req.body.index) {
      this.contract.methods.getSpecificGrant(req.body.holder, req.body.index).call({from: "0x7838648829eef73ada65a1659f7259ed414e22a2"}).then((result) => {
        return res.send(result);
      }).catch(() => {
        return res.sendStatus(500);
      })
    } else {
      return res.sendStatus(400);
    }
  }

}

module.exports = TokenVestingController;