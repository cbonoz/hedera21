<img src='./assets/vocal_trans_black.png' style="margin: 0 auto;"/>

# Vocal Coin

## A Distributed Political Currency.

Vocal is a currency and economy for promoting social change and civic engagement.

Turning voting and political involvement into a tradeable digital asset.

You give a vote, in return you can use those votes to promote your own causes on the Vocalcoin network.

Going after the following challenges:

- Main prizes
- Social Good Challenge - Sponsored by The Chopra Foundation
- Tokenization Protocol Challenge - Sponsored by University College London.

Built on Hedera using HTS which reduced the complexity in deploying the Vocalcoin contract without requiring deploying a smart contract manually.
 
Uses HTS topics, subscriptions, accounts, balances, and transfers. Topics broadcast live polls using pub-sub.

### What Vocal Solves:

- Engagement in politics is declining in younger demographics, engaging in political issues can seem intimidating, and sometimes not immediately accessible. Youth political engagement at all time low in 2019: https://chargerbulletin.com/youth-political-participation-at-an-all-time-low/
- Often little transparency into others opinions and issues happening around me.
- Vocal offers an immutable ledger of votes and issue creation (using the Neo blockchain) that serves as proof of when votes/issues were created.
- Lack of a universal incentive system for political participation. We now propose/create that system through the use of Vocal coin - which can be redeemed for agenda promotion, issue creation (and other things to come) through a traceable currency.
- No widely accessible platform for political engagement and discovery on a local / map scale.
- Yelp-like platform enables map-search of active political issues. Quickly and easily find the issues that are most pertinent to you and your community, without having to sift through a huge world of political agendas and issues.

### How it works:

<ol>
    <li>User signs up for a vocal account (this will automatically create a 'Vocal' wallet for that user that is either owned by them or managed by the Vocal platform) </li>
    <li>User earns Vocal coin by casting votes on particular government or other individuals' issues</li>
    <li>User redeems those vocal token for promoting his or her own initiatives (and/or social credit i.e. user gains publicity). Other opportunities for redemption can be possible in the future.</li>
    <li>Governments can also promote and add issues that they want information about from local communities, questions such as 'What would be the most valuable improvement to this town? Or should we make this investment?</li>
</ol>

## Dev notes

`/server`: Vocalcoin app server code. Run using testnet - `yarn; yarn start`
`/server/vocalcoin.js`: Generates the Vocalcoin token on the Hedera network using the Hedera Token Service (HTS).
`/web`: Vocalcoin client website. Run with testnet backend - `yarn; yarn start`

- Creating the token. From the server folder run: `server/vocalcoin.js`

Pass the account id and key on the front end.
If successful, balance should be fetched
Create the first topic
Subscribe to it
Listen to incoming polls and new votes
Give a vote and receive vocal

## Useful links

- https://hedera.com/blog/get-started-with-the-hedera-token-service-part-1
- https://portal.hedera.com/?network=testnet
- https://github.com/hashgraph/hedera-sdk-js
- https://hedera.com/blog/get-started-with-javascript

## JS Discord:

https://discord.com/channels/373889138199494658/616725732650909710
