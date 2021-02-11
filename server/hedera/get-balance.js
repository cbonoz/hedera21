import {
  Client,
  AccountBalanceQuery,
  PrivateKey,
  AccountId,
} from "@hashgraph/sdk";

async function getBalance(client, accountId) {
  const balance = await new AccountBalanceQuery()
    .setAccountId(accountId)
    .execute(client);

  console.log(
    `${client.operatorAccountId.toString()} balance = ${balance.hbars}`
  );
  return balance;
}

export default getBalance;
