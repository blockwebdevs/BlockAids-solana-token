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
  createUpdateMetadataAccountV2Instruction,
} from "@metaplex-foundation/mpl-token-metadata";
import {findMetadataPda, logInfo} from "@metaplex-foundation/js";
import * as fs from "fs";

let connection = new Connection(clusterApiUrl("testnet"), "confirmed");

async function updateMetadata({
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
    createUpdateMetadataAccountV2Instruction(
      {
        metadata: metadataPDA,
        updateAuthority: publicKey,
      },
      {
        updateMetadataAccountArgsV2: {
          data: tokenMetadata,
          updateAuthority: publicKey,
          primarySaleHappened: true,
          isMutable: true,
        },
      }
    )
  );
  await sendAndConfirmTransaction(connection, updateMetadataTransaction, [
    keypair,
  ]);
}

const privateKeyFile = fs.readFileSync(
  "/Users/tudoriovita/my-keypair.json"
);
let privateKeySeed = JSON.parse(privateKeyFile.toString()).slice(0, 32);
let keypair = Keypair.fromSeed(Uint8Array.from(privateKeySeed));
console.log("Token update authority:", keypair.publicKey.toString());

updateMetadata({
  publicKey: keypair.publicKey,
  tokenMint: "C8bgqeXiQeAAPHF7DYmJJy795NjU3WkTymNNXbXs6xA7",
  tokenName: "BA",
  tokenSymbol: "$BA",
  tokenUrl: "https://arweave.net/Wtvd6MvCBO_ZXbLcR20mHDhBx2Bwpx_xZSb3OM_cDzg",
}).then(r => console.log(r));
