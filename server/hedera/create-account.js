import {
  Client,
  PrivateKey,
  AccountCreateTransaction,
  Hbar,
  TokenCreateTransaction,
  TokenAssociateTransaction,
  AccountId,
} from "@hashgraph/sdk";
import { VOCAL_TOKEN_ID } from "../credentials.js";

async function createAccount(client) {
  const newKey = PrivateKey.generate();

  console.log(`private key = ${newKey}`);
  console.log(`public key = ${newKey.publicKey}`);

  const resp = await new AccountCreateTransaction()
    .setKey(newKey.publicKey)
    .execute(client);

  const transactionReceipt = await resp.getReceipt(client);
  const newAccountId = transactionReceipt.accountId;

  console.log(`account id = ${newAccountId}`);

  await (
    await (
      await new TokenAssociateTransaction()
        .setAccountId(newAccountId)
        .setTokenIds([VOCAL_TOKEN_ID])
        .freezeWith(client)
        .sign(newKey)
    ).execute(client)
  ).getReceipt(client);
  console.log(
    `Associated account ${newAccountId} with token ${VOCAL_TOKEN_ID}`
  );

  const acc = {
    accountId: newAccountId.toString(),
    publicKey: newKey.publicKey.toString(),
    privateKey: newKey.toString(),
  };
  console.log("acc", acc);
  return acc;
}

export default createAccount;
