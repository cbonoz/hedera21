import React, { useEffect, useState } from "react";
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";
import DashboardSection from "./../components/DashboardSection";
import { useAuth } from "./../util/auth.js";
import { useRouter } from "./../util/router.js";

function DashboardPage(props) {
  const auth = useAuth();
  const router = useRouter();

  const [polls, setPolls] = useState([]);

  // Redirect to signin
  // if not signed in.
  // useEffect(() => {
  //   if (auth.user === false) {
  //     router.push("/signin");
  //   }
  // }, [auth, router]);

  const broadcast = () => {
    alert("broadcast");
  };

  return (
    <div className="container">
      <div className="columns">
        <div className="column is-half">
          <Section color={props.color} size={props.size}>
            <div className="container">
              <SectionHeader
                title={"Create poll"}
                subtitle={props.subtitle}
                centered={true}
                size={3}
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
