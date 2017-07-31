"use strict";

exports.abi =  () => {
  const abi = [
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "grants",
      "outputs": [
        {
          "name": "granter",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        },
        {
          "name": "cliff",
          "type": "uint64"
        },
        {
          "name": "vesting",
          "type": "uint64"
        },
        {
          "name": "start",
          "type": "uint64"
        },
        {
          "name": "revokable",
          "type": "bool"
        },
        {
          "name": "burnsOnRevoke",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "holder",
          "type": "address"
        }
      ],
      "name": "lastTokenIsTransferableDate",
      "outputs": [
        {
          "name": "date",
          "type": "uint64"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        },
        {
          "name": "_start",
          "type": "uint64"
        },
        {
          "name": "_cliff",
          "type": "uint64"
        },
        {
          "name": "_vesting",
          "type": "uint64"
        },
        {
          "name": "_revokable",
          "type": "bool"
        },
        {
          "name": "_burnsOnRevoke",
          "type": "bool"
        }
      ],
      "name": "grantVestedTokens",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "grantId",
          "type": "uint256"
        }
      ],
      "name": "NewTokenGrant",
      "type": "event"
    }
  ];

  return abi;
};
