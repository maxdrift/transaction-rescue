import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

async function main(): Promise<void> {
  // Get command line arguments
  const nonce = process.env.NONCE ? parseInt(process.env.NONCE) : undefined;

  if (!nonce) {
    throw new Error(
      "Missing required environment variable. Please set NONCE to the stuck transaction's nonce"
    );
  }

  // Fetch the signer account
  const [signer]: SignerWithAddress[] = await ethers.getSigners();
  console.log("Using account:", signer.address);
  console.log("Nonce:", nonce);

  // Create a 0-value transaction to self
  const tx = {
    to: signer.address,
    value: 0,
    nonce: nonce,
    // Let ethers calculate the current market gas price
  };

  console.log("Submitting replacement transaction...");
  const replacementTx = await signer.sendTransaction(tx);

  console.log("Waiting for transaction to be mined...");
  await replacementTx.wait();

  console.log("Transaction successfully mined!");
  console.log("Transaction hash:", replacementTx.hash);
}

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
