import {
  Client,
  AccountBalanceQuery,
  PrivateKey,
  AccountId,
} from "@hashgraph/sdk";

async function getBalance(client, accountId) {
  // accountId = client.operatorAccountId;
  const balance = await new AccountBalanceQuery()
    .setAccountId(accountId)
    .execute(client);

  const balanceString = balance.tokens.toString();
  console.log(`${accountId} balance = ${balanceString}`);
  return JSON.parse(balanceString);
}

export default getBalance;
