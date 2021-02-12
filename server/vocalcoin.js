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
  AccountCreateTransaction,
  AccountDeleteTransaction,
  Hbar,
  TokenAssociateTransaction,
  TokenDeleteTransaction,
  TokenGrantKycTransaction,
  TransferTransaction,
  TokenWipeTransaction,
  AccountBalanceQuery,
  TransactionId,
} from "@hashgraph/sdk";
import getBalance from "./hedera/get-balance.js";

// TODO: add environment variables for operator generation of Vocalcoin token and server.
const INITIAL_SUPPLY = 100000000;

const operatorId = HEDERA_TEST_ACCOUNT;
const operatorPublicKey = HEDERA_PUBLIC_KEY;
const operatorKey = HEDERA_PRIVATE_KEY;

const client = Client.forTestnet();
client.setOperator(operatorId, operatorKey);

//Create a token, ex: https://youtu.be/JZDAMScxbpU?t=854
let resp = await new TokenCreateTransaction()
  .setTokenName("Vocalcoin")
  .setTokenSymbol("VOCAL")
  .setDecimals(3)
  .setTreasuryAccountId(client.operatorAccountId)
  .setAdminKey(client.operatorPublicKey)
  .setFreezeKey(client.operatorPublicKey)
  .setWipeKey(client.operatorPublicKey)
  .setKycKey(client.operatorPublicKey)
  .setSupplyKey(client.operatorPublicKey)
  .setInitialSupply(INITIAL_SUPPLY)
  .execute(client);

//Get the receipt of the the transaction
const receipt = await resp.getReceipt(client);

//Get the token ID from the receipt
const tokenId = receipt.tokenId;
console.log("The new token ID is " + tokenId.toString());

const newKey = PrivateKey.generate();

console.log(`private key = ${newKey}`);
console.log(`public key = ${newKey.publicKey}`);

resp = await new AccountCreateTransaction()
  .setKey(newKey.publicKey)
  .setInitialBalance(new Hbar(2))
  .execute(client);

const transactionReceipt = await resp.getReceipt(client);
const newAccountId = transactionReceipt.accountId;

console.log(`account id = ${newAccountId}`);

await (
  await (
    await new TokenAssociateTransaction()
      .setNodeAccountIds([resp.nodeId])
      .setAccountId(newAccountId)
      .setTokenIds([tokenId])
      .freezeWith(client)
      .sign(newKey)
  ).execute(client)
).getReceipt(client);
console.log(`Associated account ${newAccountId} with token ${tokenId}`);

await (
  await new TokenGrantKycTransaction()
    .setNodeAccountIds([resp.nodeId])
    .setAccountId(newAccountId)
    .setTokenId(tokenId)
    .execute(client)
).getReceipt(client);

console.log(`Granted KYC for account ${newAccountId} on token ${tokenId}`);

await (
  await new TransferTransaction()
    .setNodeAccountIds([resp.nodeId])
    .addTokenTransfer(tokenId, client.operatorAccountId, -10)
    .addTokenTransfer(tokenId, newAccountId, 10)
    .execute(client)
).getReceipt(client);

console.log(
  `Sent 10 tokens from account ${client.operatorAccountId} to account ${newAccountId} on token ${tokenId}`
);

const balances = await new AccountBalanceQuery()
  .setAccountId(client.operatorAccountId)
  .execute(client);

console.log(
  `Token balances for ${
    client.operatorAccountId
  } are ${balances.tokens.toString()}`
);

await getBalance(client, newAccountId);
