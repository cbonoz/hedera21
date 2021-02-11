import React, { useEffect, useState } from "react";
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";
import DashboardSection from "./../components/DashboardSection";
import { useAuth } from "./../util/auth.js";
import { useRouter } from "./../util/router.js";

import { io } from "socket.io-client";
import FormField from "../components/FormField";

const socket = io("http://127.0.0.1:8000");

function DashboardPage(props) {
  const { user } = useAuth();
  const router = useRouter();

  const [polls, setPolls] = useState([]);
  const [draftPoll, setDraftPoll] = useState({});
  const [topicId, setTopicId] = useState("");

  useEffect(() => {
    // client-side
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on("disconnect", () => {
      console.log(socket.id); // undefined
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
    console.log("broadcast", JSON.stringify(draftPoll));
  };

  return (
    <div className="container">
      <p>User: {user.email}</p>
      <p>Key: {`${(user.key || "").substring(0, 4)}***`}</p>
      <p>Balance: {user.balance || 0} VOCAL </p>
      <div className="columns">
        <div className="column is-half">
          <Section color={props.color} size={props.size}>
            <div className="container">
              <SectionHeader
                title={"Discover polls"}
                subtitle={props.subtitle}
                centered={true}
                size={3}
              />

              <p>Enter an existing topic ID:</p>

              <FormField
                value={topicId}
                type="text"
                placeholder="Topic, ex: 0.0.319850"
                error={false}
                onChange={(t) => setTopicId(t)}
              />

              <p>
                <b>OR</b>
              </p>
              <br />

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
                title={"Incoming votes"}
                subtitle={props.subtitle}
                centered={true}
                size={3}
              />
              {polls.map((poll, i) => {
                return <div>{poll}</div>;
              })}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
