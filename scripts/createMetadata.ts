import {
  Transaction,
  PublicKey,
  Keypair,
  Connection,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  DataV2,
  createCreateMetadataAccountV2Instruction,
} from "@metaplex-foundation/mpl-token-metadata";
import {findMetadataPda} from "@metaplex-foundation/js";
import * as fs from "fs";

const connection = new Connection(clusterApiUrl("testnet"), "confirmed");

async function createMetadata(
  {
    publicKey,
    tokenMint,
    tokenName,
    tokenSymbol,
    tokenUrl,
  }: {
    publicKey: PublicKey;
    tokenMint: string;
    tokenName: string;
    tokenSymbol: string;
    tokenUrl: string;
  }) {
  const mint = new PublicKey(tokenMint);
  const metadataPDA = await findMetadataPda(mint);
  const tokenMetadata = {
    name: tokenName,
    symbol: tokenSymbol,
    uri: tokenUrl,
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
  } as DataV2;

  const updateMetadataTransaction = new Transaction().add(
    createCreateMetadataAccountV2Instruction(
      {
        metadata: metadataPDA,
        updateAuthority: publicKey,
        mint: mint,
        mintAuthority: publicKey,
        payer: publicKey,
      },
      {
        createMetadataAccountArgsV2: {
          data: tokenMetadata,
          isMutable: true,
        },
      }
    )
  );
  await sendAndConfirmTransaction(connection, updateMetadataTransaction, [
    keypair,
  ]);
}

// Change these variables:
const tokenMint = "DV78wP1FLFJp7Jr6YozurshB5fT7NeTK1KKoU6KbW6SF";
const tokenName = "BlockAIDS";
const tokenSymbol = "AIDS";
const tokenUrl = "https://bafybeidwv2zyjk4uq7pofrx4cgutz7pc64hczppfcxyvgm3vm4hqxcv564.ipfs.dweb.link/"; //https://w3s.link/ipfs/
const privateKeyFile = fs.readFileSync("/Users/tudoriovita/my-keypair.json");

const privateKeySeed = JSON.parse(privateKeyFile.toString()).slice(0, 32);
const keypair = Keypair.fromSeed(Uint8Array.from(privateKeySeed));

console.log("Token update authority:", keypair.publicKey.toString());

createMetadata({
  publicKey: keypair.publicKey,
  tokenMint,
  tokenName,
  tokenSymbol,
  tokenUrl,
}).then(r => console.log(r));
