const { ethers } = require("hardhat");

async function main() {
  const SampleToken = await ethers.getContractFactory("SampleToken");
  const sample_token = await SampleToken.deploy(
    "Defenetly Not Scum Token",
    "DNST",
    18,
    10000
  );

  await sample_token.deployed();

  console.log("SampleToken deployed to:", sample_token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
