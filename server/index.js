/* include express.js & socket.io */
import express from "express";
import cors from "cors";

import { createServer } from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";

import {
  HEDERA_PRIVATE_KEY,
  HEDERA_PUBLIC_KEY,
  HEDERA_TEST_ACCOUNT,
} from "./credentials.js";

/* hedera.js */
// https://github.com/hashgraph/hedera-sdk-js/blob/master/examples/consensus-pub-sub.js
import {
  Client,
  TopicMessageSubmitTransaction,
  TopicId,
  TopicCreateTransaction,
  TopicMessageQuery,
} from "@hashgraph/sdk";

import { secondsToDate, handleLog, sleep, UInt8ToString } from "./utils.js";

/* include other packages */
import pkg from "text-encoding";
import getBalance from "./hedera/get-balance.js";

const { TextDecoder } = pkg;
const app = express();
app.use(bodyParser.json());
app.use(cors());
const httpServer = createServer(app);

const PORT = 8000;
const ORIGIN = "http://localhost:3000"; // localhost for dev, replace with hosted domain for production.

const io = new Server(httpServer, {
  cors: {
    origin: ORIGIN,
  },
});

const log = handleLog;

const specialChar = "|";
var operatorAccount = "";
var HederaClient = Client.forTestnet();
var topicId = "";
var logStatus = "Default";

const TOPIC_NAME = "test-topic";

const appConfig = {
  existingTopicId: "0.0.319850",
};

/* configure our env based on prompted input */
async function init() {
  configureAccount(appConfig.account, appConfig.key);
  if (appConfig.existingTopicId) {
    configureExistingTopic(appConfig.existingTopicId);
  } else {
    await configureNewTopic(TOPIC_NAME);
  }
  /* run & serve the express app */
  runVocal();
}

function runVocal() {
  console.log("runVocal");
  httpServer.listen(PORT);

  app.post("/balance", async (req, res) => {
    const { accountId } = req.body;
    try {
      const balance = await getBalance(HederaClient, accountId);
      return res.json({ balance });
    } catch (e) {
      return res.json({ e });
    }
  });

  subscribeToMirror();
  io.on("connection", function (client) {
    console.log("connected", client.id);
    io.emit(
      "connect message",
      operatorAccount + specialChar + client.id + specialChar + topicId
    );
    client.on("comment", function (msg) {
      // const formattedMessage =
      //   operatorAccount + specialChar + client.id + specialChar + msg;
      sendHCSMessage(msg);
    });
    client.on("disconnect", function () {
      io.emit("disconnect message", operatorAccount + specialChar + client.id);
    });
  });
}

init(); // process arguments & handoff to runVocal()

/* helper hedera functions */
/* have feedback, questions, etc.? please feel free to file an issue! */
function sendHCSMessage(msg) {
  try {
    new TopicMessageSubmitTransaction()
      .setTopicId(topicId)
      .setMessage(msg)
      .execute(HederaClient);
    log("SubmitMessageTransaction()", msg, logStatus);
  } catch (error) {
    log("ERROR: SubmitMessageTransaction()", error, logStatus);
    process.exit(1);
  }
}

function subscribeToMirror() {
  try {
    new TopicMessageQuery()
      .setTopicId(topicId)
      .subscribe(HederaClient, (res) => {
        const message = Buffer.from(res.contents, "utf8").toString();
        log("Response from MirrorTopicQuery()", message, logStatus);
        var runningHash = UInt8ToString(res["runningHash"]);
        var timestamp = secondsToDate(res["consensusTimestamp"]);
        io.emit(
          "receive",
          message +
            specialChar +
            res.sequenceNumber +
            specialChar +
            runningHash +
            specialChar +
            timestamp
        );
      });
    log("MirrorTopicQuery()", topicId.toString(), logStatus);
  } catch (error) {
    log("ERROR: MirrorTopicQuery()", error, logStatus);
    process.exit(1);
  }
}

async function createNewTopic(topicName) {
  try {
    const txId = await new TopicCreateTransaction()
      .setTopicMemo(topicName)
      .execute(HederaClient);

    log(
      "TopicCreateTransaction()",
      `submitted tx ${JSON.stringify(txId)}`,
      logStatus
    );
    await sleep(3000); // wait until Hedera reaches consensus
    const receipt = await txId.getReceipt(HederaClient);
    const newTopicId = receipt.topicId;
    log(
      "TopicCreateTransaction()",
      `success! new topic ${newTopicId}`,
      logStatus
    );
    return newTopicId;
  } catch (error) {
    log("ERROR: TopicCreateTransaction()", error, logStatus);
    process.exit(1);
  }
}

/* helper init functions */
function configureAccount(account, key) {
  try {
    // If either values in our init() process were empty
    // we should try and fallback to the .env configuration
    if (!account || !key) {
      log("init()", "using default .env config", logStatus);
      operatorAccount = HEDERA_TEST_ACCOUNT;
      HederaClient.setOperator(HEDERA_TEST_ACCOUNT, HEDERA_PRIVATE_KEY);
    }
    // Otherwise, let's use the initalization parameters
    else {
      operatorAccount = account;
      HederaClient.setOperator(account, key);
    }
  } catch (error) {
    log("ERROR: configureAccount()", error, logStatus);
    process.exit(1);
  }
}

async function configureNewTopic(topicName) {
  log("init()", "creating new topic", logStatus);
  topicId = await createNewTopic(topicName);
  log(
    "TopicCreateTransaction()",
    `waiting for new HCS Topic & mirror node (it may take a few seconds)`,
    logStatus
  );
  await sleep(9000);
  return;
}

async function configureExistingTopic(existingTopicId) {
  log("init()", "connecting to topic:" + existingTopicId, logStatus);
  topicId = TopicId.fromString(existingTopicId);
}
