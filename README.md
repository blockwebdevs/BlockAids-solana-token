# Example of creating Solana Fungible Token

## Overview

Here are the steps for creating a new Solana fungible token using command-line tools and scripts.

Also manage tokens safely across a team using a multisig wallet approach instead of a single owner.

The example token created here is called `AIds` and the final version exists on Solana testnet at [DV78wP1FLFJp7Jr6YozurshB5fT7NeTK1KKoU6KbW6SF](https://explorer.solana.com/address/DV78wP1FLFJp7Jr6YozurshB5fT7NeTK1KKoU6KbW6SF?cluster=testnet).

## Steps for creating new token

### Install tools, choose keypair and create token

1. [Install the Solana Tool Suite](https://docs.solana.com/cli/install-solana-cli-tools)

2. Create a wallet:

         solana-keygen new --outfile ~/my-keypair.json

3. Check Public Key:
                    
         solana-keygen pubkey ~/my-keypair.json

4. Check Public Key:

         solana-keygen verify (Publickey/address) ~/my-keypair.json

   5. Configure tools to use Solana's `testnet` or `mainnet-beta`:
      * Testnet:
   
              solana config set --url https://api.testnet.solana.com --keypair ~/my-keypair.json
      * Mainnet:

              solana config set --url https://api.mainnet-beta.solana.com --keypair ~/my-keypair.json
      
6. Confirm Testnet/Mainnet:

        solana config get

7. For Testnet - Airdrop solana:

        solana airdrop 2

8. Check Solana balance (if it does not change, supply the balance manually, using the public key):

        solana balance

9. Create Token, then got token address:

        spl-token create-token

10. Create Account:

        spl-token create-account {token address}

11. Mint Token:

        spl-token mint {token address} {number of token}

12. Check accounts:

        spl-token accounts

13. Get Address:

        spl-token address


### Add metadata for token

1. To create metadata:

        npm run create-metadata

2. To update metadata:

        npm run update-metadata

### Transfer and disable feature minting

1. Transfer Tokens:

        spl-token transfer --fund-recipient {token address} {amount} {recipient address} --allow-unfunded-recipient

2. Disable feature minting:

         spl-token authorize {token address} mint --disable

## Credits

These useful resources served as an initial foundation for docs and scripts in this repo:

- Solana's Token Program and Documentation: [Solana's Token Program](https://spl.solana.com/token)
- [Token Creator source code](https://github.com/jacobcreech/Token-Creator)
- [Create Solana Token](https://github.com/briangershon/create-solana-token)
