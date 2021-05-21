const Greeting = artifacts.require("Greeting");

module.exports = async function (deployer, network, accounts){
    await deployer.deploy(Greeting);
};