# Transaction Rescue

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16-brightgreen)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

A utility script to rescue stuck transactions in MetaMask (or other wallets) by replacing them with a new transaction using the same nonce. When transactions get stuck due to low gas prices or other issues, this tool helps you replace them with a new transaction.

## Problem

Sometimes, blockchain transactions can get stuck in a pending state due to various reasons:
- Gas price was too low for current network conditions
- Network congestion causing transaction to be stuck in mempool
- Multiple transactions sent in quick succession causing nonce conflicts
- Wallet's nonce tracking getting out of sync with the network

## Solution

The solution is to replace the stuck transaction by submitting a new transaction with:
1. The exact same nonce as the stuck transaction
2. A higher gas price (usually current market rate)
3. A simple transfer of 0 value to your own address

This effectively cancels the stuck transaction by replacing it in the mempool with a simple, guaranteed-to-succeed transaction.

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- A wallet with a small amount of native tokens for gas fees

## Installation

1. Clone this repository:
```bash
git clone https://github.com/maxdrift/tx-rescue.git
cd tx-rescue
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment file template:
```bash
cp .env.example .env
```

4. Edit `.env` file with your configuration:
```env
# Your wallet's private key (without 0x prefix)
PRIVATE_KEY=your_private_key_here

# Network Configuration
RPC_URL=your_network_rpc_url
CHAIN_ID=1  # e.g., 1 for Ethereum, 137 for Polygon, etc.

# Stuck Transaction Details
NONCE=123  # The nonce of your LAST CONFIRMED transaction + 1
```

## Usage

Run the script with:
```bash
npm run unstuck
```

The script will:
1. Connect to your specified network using the RPC URL
2. Create a 0-value transaction to your own address
3. Submit it with the specified nonce and current market gas price
4. Wait for the transaction to be mined
5. Output the transaction hash for verification

## Finding the Stuck Transaction Nonce

⚠️ **Important**: The nonce you need to use is the nonce of your last **confirmed** transaction **plus 1**. This ensures you're targeting the correct stuck transaction. Here's how to find it:

1. Open MetaMask (or your wallet)
2. Go to Activity/History
3. Find your last **confirmed** (successfully mined) transaction
4. Click on the transaction
5. Look for the nonce value
6. Add 1 to this nonce value - this is the value you should use

For example:
- If your last confirmed transaction has nonce 108
- Then you should use nonce 109 in the `.env` file

## Common Chain IDs

Here are some common network Chain IDs:
| Network | Chain ID |
|---------|----------|
| Ethereum Mainnet | 1 |
| Polygon | 137 |
| Base | 8453 |
| Arbitrum One | 42161 |
| Optimism | 10 |
| Avalanche C-Chain | 43114 |

## Security

⚠️ **Important Security Notes:**
- Never commit your `.env` file
- Keep your private keys secure
- Verify all addresses and amounts before running the script
- Test with small amounts first
- Double-check the network configuration before submitting transactions
- Make sure you're using the correct nonce value from your wallet's transaction history

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

Special thanks to [@BarneyChambers](https://github.com/BarneyChambers) for guidance on the correct approach to handling stuck transactions through nonce replacement.

This project was generated using [Cursor](https://cursor.sh/), a powerful AI-powered code editor.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
