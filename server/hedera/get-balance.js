import {
  Client,
  AccountBalanceQuery,
  PrivateKey,
  AccountId,
} from "@hashgraph/sdk";

async function getBalance() {
  let client;

  if (process.env.HEDERA_NETWORK != null) {
    switch (process.env.HEDERA_NETWORK) {
      case "previewnet":
        client = Client.forPreviewnet();
        break;
      default:
        client = Client.forTestnet();
    }
  } else {
    try {
      client = await Client.fromConfigFile(process.env.CONFIG_FILE);
    } catch (err) {
      client = Client.forTestnet();
    }
  }

  if (
    process.env.HEDERA_PRIVATE_KEY != null &&
    process.env.HEDERA_ACCOUNT_ID != null
  ) {
    const operatorKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY);
    const operatorId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID);

    client.setOperator(operatorId, operatorKey);
  }

  const balance = await new AccountBalanceQuery()
    .setAccountId(client.operatorAccountId)
    .execute(client);

  console.log(
    `${client.operatorAccountId.toString()} balance = ${balance.hbars}`
  );
}

export default getBalance;
