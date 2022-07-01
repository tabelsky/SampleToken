const { task } = require("hardhat/config");

require("@nomiclabs/hardhat-waffle");

const ROPSTEN_DEFAULT_CONTRACT_ADRESS =
  "0x188c417F1d3c5Bd611153E62079F79DDfaF22374";

async function getSampleToken(contract, hre) {
  contract = contract || ROPSTEN_DEFAULT_CONTRACT_ADRESS;
  const SampleToken = await hre.ethers.getContractFactory("SampleToken");
  const sampleToken = await SampleToken.attach(contract);
  return sampleToken;
}

task("mint", "mint")
  .addOptionalParam("contract", "Contract addess")
  .addOptionalParam("to", "receiver of minted")
  .addParam("value", "amount of tokens")
  .setAction(async ({ contract, to, value }, hre) => {
    const sampleToken = await getSampleToken(contract, hre);
    to = to || (await hre.ethers.getSigners())[0].address;

    console.log(await sampleToken.mint(to, value));
  });

task("burn", "burn")
  .addOptionalParam("contract", "Contract addess")
  .addOptionalParam("from", "victim of burning")
  .addParam("value", "amount of tokens")
  .setAction(async ({ contract, from, value }, hre) => {
    const sampleToken = await getSampleToken(contract, hre);
    from = from || (await hre.ethers.getSigners())[0];
    console.log(await sampleToken.burn(from.address, value));
  });

task("transfer", "transfer")
  .addOptionalParam("contract", "Contract addess")
  .addParam("to", "receiver")
  .addParam("value", "amount")
  .setAction(async ({ contract, to, value }, hre) => {
    const sampleToken = await getSampleToken(contract, hre);
    console.log(await sampleToken.transfer(to, value));
  });

task("approve", "approve")
  .addOptionalParam("contract", "Contract addess")
  .addParam("spender", "spender")
  .addParam("value", "amount")
  .setAction(async ({ contract, spender, value }, hre) => {
    const sampleToken = await getSampleToken(contract, hre);
    console.log(await sampleToken.approve(spender, value));
  });

task("allowance", "allowance")
  .addOptionalParam("contract", "Contract addess")
  .addParam("owner", "owner")
  .addParam("spender", "spender")
  .setAction(async ({ contract, owner, spender }, hre) => {
    const sampleToken = await getSampleToken(contract, hre);
    console.log(await sampleToken.allowance(owner, spender));
  });

task("transferFrom", "transferFrom")
  .addOptionalParam("contract", "Contract addess")
  .addParam("from", "from")
  .addParam("to", "to")
  .addParam("value", "value")
  .setAction(async ({ contract, from, to, value }, hre) => {
    const sampleToken = await getSampleToken(contract, hre);
    console.log(await sampleToken.transferFrom(from, to, value));
  });

// task("vote", "Vote for address")
//   .addOptionalParam("contract", "Contract addess")
//   .addParam("voteId", "ID of a vote round")
//   .addParam("candidate", "Address of a candidate")
//   .addOptionalParam("ammount", "Amount of a daonation")
//   .setAction(async ({ contract, voteId, candidate, amount }, hre) => {
//     amount = amount
//       ? hre.ethers.utils.parseEther(amount)
//       : hre.ethers.utils.parseEther("0.01");
//     const voting = await getVoting(contract, hre);

//     await voting.vote(parseInt(voteId), candidate, { value: amount });
//   });

// task("voteInfo", "Get info about vote round")
//   .addOptionalParam("contract", "Contract addess")
//   .addParam("voteId", "ID of a vote round")
//   .setAction(async ({ contract, voteId }, hre) => {
//     const voting = await getVoting(contract, hre);
//     console.log(await voting.getVoteRoundInfo(parseInt(voteId)));
//   });

// task("finish", "Finish a vote round")
//   .addOptionalParam("contract", "Contract addess")
//   .addParam("voteId", "ID of a vote round")
//   .setAction(async ({ contract, voteId }, hre) => {
//     const voting = await getVoting(contract, hre);
//     await voting.finish(voteId);
//   });

// task("withdrawal", "Withdraw from a contract")
//   .addOptionalParam("contract", "Contract addess")
//   .setAction(async ({ contract }, hre) => {
//     const voting = await getVoting(contract, hre);
//     await voting.withdrawal();
//   });

module.exports = {};
