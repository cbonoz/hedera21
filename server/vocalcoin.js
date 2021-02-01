
// TODO: add environment variables for operator generation of Vocalcoin token and server.


const INITIAL_SUPPLY = 100000000

//Create a token
const transaction = await new TokenCreateTransaction()
 .setTokenName("Vocalcoin")
 .setTokenSymbol("VOCAL")
 .setTreasuryAccountId(treasuryAccountId)
 .setInitialSupply(INITIAL_SUPPLY) 
 .setAdminKey(adminPublicKey)
 .freezeWith(client);


//Sign the transaction with the token adminKey and the token treasury account private key
const signTx = await (await transaction.sign(adminKey)).sign(treasuryKey);

//Sign the transaction with the client operator private key and submit to a Hedera network
const txResponse = await signTx.execute(client);
 

//Get the receipt of the the transaction
const receipt = await txResponse.getReceipt(client);


//Get the token ID from the receipt
const tokenId = receipt.tokenId;
console.log("The new token ID is " + tokenId);