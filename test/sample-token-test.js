const { ethers } = require("hardhat");
const chai = require("chai");
const { solidity } = require("ethereum-waffle");
chai.use(solidity);
const { expect } = chai;

const baseSupply = 10000;

describe("SampleToken", function () {
  let sampleToken, owner, account_1, account_2;

  beforeEach(async function () {
    [owner, account_1, account_2] = await ethers.getSigners();
    const SampleToken = await ethers.getContractFactory("SampleToken", owner);
    sampleToken = await SampleToken.deploy(
      "Defenetly Not Scum Token",
      "DNST",
      18,
      baseSupply
    );
    await sampleToken.deployed();
  });

  it("check constructor", async function () {
    expect(await sampleToken.name()).to.equal("Defenetly Not Scum Token");
    expect(await sampleToken.symbol()).to.equal("DNST");
    expect(await sampleToken.decimals()).to.equal(18);
    expect(await sampleToken.totalSupply()).to.equal(baseSupply);
    expect(await sampleToken.balanceOf(owner.address)).to.equal(baseSupply);
  });

  it("check mint", async function () {
    await sampleToken.mint(owner.address, 5000);
    expect(await sampleToken.totalSupply()).to.equal(baseSupply + 5000);
    expect(await sampleToken.balanceOf(owner.address)).to.equal(
      baseSupply + 5000
    );
    const event = (await (await sampleToken.mint(owner.address, 1)).wait())
      .events[0];
    expect(event.args[0]).to.equal(
      "0x0000000000000000000000000000000000000000"
    );
    expect(event.args[1]).to.equal(owner.address);
    expect(event.args[2]).to.equal(1);
    expect(
      sampleToken.connect(account_1).mint(account_1.address, 1)
    ).to.be.revertedWith("not enough privileges");
  });

  it("check transfer without tokens", async function () {
    expect(
      sampleToken.connect(account_1).transfer(account_2.address, 1)
    ).to.be.revertedWith("not enough tokens");
  });

  it("check transfer", async function () {
    await sampleToken.mint(account_1.address, 5000);
    const event = (
      await (
        await (
          await sampleToken.connect(account_1)
        ).transfer(account_2.address, 1000)
      ).wait()
    ).events[0];
    expect(event.args[0]).to.equal(account_1.address);
    expect(event.args[1]).to.equal(account_2.address);
    expect(event.args[2]).to.equal(1000);
    expect(await sampleToken.balanceOf(account_1.address)).to.equal(4000);
    expect(await sampleToken.balanceOf(account_2.address)).to.equal(1000);
    expect(await sampleToken.totalSupply()).to.equal(baseSupply + 5000);
  });

  it("check aprove", async function () {
    await sampleToken.mint(account_1.address, 5000);
    const event = (
      await (
        await (
          await sampleToken.connect(account_1)
        ).approve(account_2.address, 1000)
      ).wait()
    ).events[0];
    expect(event.args[0]).to.equal(account_1.address);
    expect(event.args[1]).to.equal(account_2.address);
    expect(event.args[2]).to.equal(1000);
    expect(
      await sampleToken.allowance(account_1.address, account_2.address)
    ).to.be.equal(1000);
    expect(
      await sampleToken.allowance(account_2.address, account_1.address)
    ).to.be.equal(0);
  });

  it("check transfer small balance", async function () {
    expect(
      sampleToken.transferFrom(account_1.address, account_2.address, 1)
    ).to.be.revertedWith("not enough tokens");
  });

  it("check transfer small allowance", async function () {
    await sampleToken.mint(account_1.address, 5000);
    await await (
      await sampleToken.connect(account_1)
    ).approve(account_2.address, 1000);
    expect(
      sampleToken.transferFrom(account_1.address, account_2.address, 2000)
    ).to.be.revertedWith("not enough allowance");
  });

  it("check transfer", async function () {
    await sampleToken.mint(account_1.address, 5000);
    await await (
      await sampleToken.connect(account_1)
    ).approve(account_2.address, 4000);
    const event = (
      await (
        await sampleToken.transferFrom(
          account_1.address,
          account_2.address,
          1000
        )
      ).wait()
    ).events[0];
    expect(event.args[0]).to.equal(account_1.address);
    expect(event.args[1]).to.equal(account_2.address);
    expect(event.args[2]).to.equal(1000);
    expect(
      await sampleToken.allowance(account_1.address, account_2.address)
    ).to.be.equal(3000);
    expect(await sampleToken.balanceOf(account_1.address)).to.equal(4000);
    expect(await sampleToken.balanceOf(account_2.address)).to.equal(1000);
  });

  it("check burn unfortunly", async function () {
    expect(
      sampleToken.connect(account_1).burn(owner.address, 1000)
    ).to.be.revertedWith("not enough privileges");
    expect(sampleToken.burn(owner.address, baseSupply + 1)).to.be.revertedWith(
      "not enough tokens"
    );
  });

  it("check burn", async function () {
    const event = (await (await sampleToken.burn(owner.address, 1000)).wait())
      .events[0];
    expect(event.args[0]).to.equal(owner.address);
    expect(event.args[1]).to.equal(
      "0x0000000000000000000000000000000000000000"
    );
    expect(event.args[2]).to.equal(1000);
    expect(await sampleToken.balanceOf(owner.address)).to.equal(
      baseSupply - 1000
    );
    expect(await sampleToken.totalSupply()).to.equal(baseSupply - 1000);
  });
});
