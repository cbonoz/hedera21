import React, { useEffect, useState } from "react";
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";
import DashboardSection from "./../components/DashboardSection";
import { useAuth } from "./../util/auth.js";
import { getBalance, VOCAL_TOKEN_ID } from "./../util/http.js";
import { useRouter } from "./../util/router.js";

import { io } from "socket.io-client";
import FormField from "../components/FormField";

const socket = io("http://127.0.0.1:8000");

const DEFAULT_POLLS = [
  {
    title: "Right to repair",
    description:
      "Voting on this would give access to more detailed vehicle records",
  },
  {
    title: "Allow for graduated income tax",
    description: "Voting on this would create a graduated income tax law",
    comments: ["I support this initiative in Sonoma."],
  },
  {
    title: "Rent control in California",
    description:
      "Voting on this would enforce rent control in certain regions of California",
  },
];

function DashboardPage(props) {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const [polls, setPolls] = useState(DEFAULT_POLLS);
  const [draftPoll, setDraftPoll] = useState({});
  const [topicId, setTopicId] = useState("");
  const [message, setMessage] = useState();
  const [balance, setBalance] = useState(null);
  const [activePoll, setActivePoll] = useState({});

  useEffect(() => {
    async function fetchBalance() {
      if (user.accountId) {
        const response = await getBalance(user.accountId);
        const result = response.data;
        const newBalance =
          (result && result.balance && result.balance[VOCAL_TOKEN_ID]) || 0;
        console.log(result, newBalance);
        setBalance(newBalance);
      }
    }
    fetchBalance();
  }, []);

  useEffect(() => {
    // client-side
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on("disconnect", () => {
      console.log(socket.id); // undefined
    });

    socket.on("receive", (data) => {
      const tokens = data.split("|");
      const payload = tokens[0];
      console.log("receive", payload, data);
      const message = JSON.parse(payload);
      const newPolls = [...polls];
      const matchingTopic = polls.map((x) => x.title).indexOf(message.topicId);
      if (matchingTopic == -1) {
        return;
      }

      const newMessage = `${message.message} - ${tokens[tokens.length - 1]}`;
      newPolls[matchingTopic].comments = [
        ...(newPolls[matchingTopic].comments || []),
        newMessage,
      ];
      setPolls(newPolls);
      setBalance(balance + 10);
    });
  }, []);

  // Redirect to signin
  // if not signed in.
  // useEffect(() => {
  //   if (auth.user === false) {
  //     router.push("/signin");
  //   }
  // }, [auth, router]);

  const broadcast = () => {
    const data = JSON.stringify({ topicId, message });
    console.log("broadcast", data);
    socket.emit("comment", data);
  };

  return (
    <div className="container">
      <hr />
      <p>User: {user.email}</p>
      <p>Key: {`${(user.key || "").substring(0, 4)}***`}</p>
      {balance && (
        <p>
          Balance: {balance} VOCAL ({VOCAL_TOKEN_ID}){" "}
        </p>
      )}
      <div className="columns content-area">
        <div className="column is-half">
          <Section color={props.color} size={props.size}>
            <div className="container">
              <SectionHeader
                title={"Add message to existing poll"}
                subtitle={props.subtitle}
                centered={true}
                size={3}
              />

              <p>Enter an existing poll title:</p>

              <FormField
                value={topicId}
                type="text"
                placeholder="ex: Right to repair"
                error={false}
                onChange={(t) => setTopicId(t)}
              />

              <FormField
                value={message}
                type="text"
                type="textarea"
                placeholder="Message"
                error={false}
                onChange={setMessage}
              />

              <button onClick={(e) => broadcast()}>Broadcast</button>

              <p>
                <b>OR</b>
              </p>
              <br />

              <SectionHeader
                title={"Create poll"}
                subtitle={props.subtitle}
                centered={true}
                size={3}
              />

              <p>Create a new poll with the given memo</p>

              <FormField
                value={draftPoll.title}
                type="text"
                placeholder="Title"
                error={false}
                onChange={(title) => setDraftPoll({ ...draftPoll, title })}
              />

              <FormField
                value={draftPoll.description}
                type="textarea"
                placeholder="Description"
                error={false}
                onChange={(description) =>
                  setDraftPoll({ ...draftPoll, description })
                }
              />

              <button onClick={(e) => broadcast()}>Broadcast</button>
            </div>
          </Section>
        </div>
        <div className="column is-half">
          <Section color={props.color} size={props.size}>
            <div className="container">
              <SectionHeader
                title={"Incoming polls"}
                subtitle={props.subtitle}
                centered={true}
                size={3}
              />
              {polls.map((poll, i) => {
                return (
                  <div
                    className="poll-box"
                    onClick={() => setTopicId(poll.title)}
                  >
                    {i + 1}.<b>{poll.title}</b>&nbsp;
                    <p>{poll.description}</p>
                    {poll.comments && (
                      <a onClick={() => setActivePoll(poll)}>
                        {poll.comments.length} comments
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </Section>
        </div>
        <div class={`modal ${activePoll.title ? "is-active" : ""}`}>
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Poll: {activePoll.title}</p>
              <button
                class="delete"
                aria-label="close"
                onClick={() => setActivePoll({})}
              ></button>
            </header>
            <section class="modal-card-body">
              <h1 className="title is-3">Comments</h1>

              {(activePoll.comments || []).map((comment, i) => {
                return <li key={i}>{comment}</li>;
              })}
            </section>
            <footer class="modal-card-foot">
              <button
                class="button is-success"
                onClick={() => setActivePoll({})}
              >
                Done
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
