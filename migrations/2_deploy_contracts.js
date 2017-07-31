var TokenVested = artifacts.require("./TokenVested.sol");

module.exports = function(deployer) {
  deployer.deploy(TokenVested);
};
