const SimpleStorage = artifacts.require("filesystem");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
};
