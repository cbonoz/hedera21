import {
  HEDERA_PRIVATE_KEY,
  HEDERA_PUBLIC_KEY,
  HEDERA_TEST_ACCOUNT,
} from "./credentials.js";

import {
  Client,
  AccountId,
  PrivateKey,
  TokenCreateTransaction,
} from "@hashgraph/sdk";

// TODO: add environment variables for operator generation of Vocalcoin token and server.
const INITIAL_SUPPLY = 100000000;

const operatorId = HEDERA_TEST_ACCOUNT;
const operatorPublicKey = HEDERA_PUBLIC_KEY;
const operatorKey = HEDERA_PRIVATE_KEY;

const client = Client.forTestnet();
client.setOperator(operatorId, operatorKey);

//Create a token, ex: https://youtu.be/JZDAMScxbpU?t=854
const transaction = await new TokenCreateTransaction()
  .setTokenName("Vocalcoin")
  .setTokenSymbol("VOCAL")
  .setTreasuryAccountId(operatorId)
  .setInitialSupply(INITIAL_SUPPLY)
  .freezeWith(client)
  .execute(client);

//Get the receipt of the the transaction
const receipt = await transaction.getReceipt(client);

//Get the token ID from the receipt
const tokenId = receipt.tokenId;
console.log("The new token ID is " + tokenId.toString());
