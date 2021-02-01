import * as ft from "fastify"; // https://github.com/fastify/fastify
import createAccount from "./hedera/create-account.js";
import getBalance from "./hedera/get-balance.js";

const PORT = 8000;

const fastify = ft.fastify({
  logger: true,
});

fastify.get("/", (request, reply) => {
  reply.send({ hello: "world" });
});

// Hedera core routes
// https://github.com/hashgraph/hedera-sdk-js/tree/master/examples

// Use the HTS to avoid needing smart contracts to create Hedera tokens
// https://hedera.com/token-service

fastify.get("/balance", async (request, reply) => {
  const balance = await getBalance();
  reply.send({ balance });
});

fastify.post("/account", async (request, reply) => {
  const account = await createAccount();
  reply.send({ account });
});

// Vocalcoin routes

// Create a new poll.
fastify.post("/poll", async (request, reply) => {
  const account = await createAccount();
  reply.send({ account });
});

// Get poll and associated votes.
fastify.get("/poll", async (request, reply) => {
  const account = await createAccount();
  reply.send({ account });
});

// Search polls.
fastify.post("/polls/search", async (request, reply) => {
    const account = await createAccount();
    reply.send({ account });
  });

// Cast a vote for a designated poll id.
fastify.post("/vote", async (request, reply) => {
  const account = await createAccount();
  reply.send({ account });
});


// Run the server!
fastify.listen(PORT, (err, address) => {
  if (err) {
    throw err;
  }
  fastify.log.info(`server listening on ${address}`);
});
