import React from "react";
import ContentSection from "./../components/ContentSection";
import TeamBiosSection from "./../components/TeamBiosSection";

import bulmaCollapsible from "@creativebulma/bulma-collapsible";

const ITEMS = [
  {
    question: "What is Vocal?",
    // answer: "Vocal is a currency platform that puts the advertising experience back in the hands of users by rewarding them for engaging with advertisers."
    answer:
      "Vocal is a cryptocurrency platform designed to reward and promote civic engagement in voting for government initiatives",
  },
  {
    question: "How does Vocal work?",
    // answer: "Vocal credits a market rate amount of coin for each ad you watch. This amount is dynamic and will gradually decrease with time as more users join the platform. The best time to start earning is now."
    answer:
      "Vocal credits a variable* amount of coin for each vote that you submit to existing issues. This amount is dynamic and will gradually decrease as more users get involved. This coin can later be redeemed to create and promote new and existing issues on the platform.",
  },
  {
    question: "How long has Vocal been around?",
    answer: "Vocal was built for the Hedera 2021 hackathon.",
  },
  {
    question: "Do I need an account to participate?",
    answer:
      "Yes. This account will be used to track the amount of token you have, as well as enable tracking of each user contextually in terms of whether a particular vote has already submitted or not by a certain user.",
  },
  {
    question: "Explain the cryptocurrency component of Vocal",
    answer:
      "Each vote and issue that is created is recorded as a transaction on an immutable and hidden blockchain. This blockchain is immutable and will later serve as an auditable history of user activity on the platform. This data is stored on the Neo blockchain.",
  },
];

function AboutPage(props) {
  const bulmaCollapsibleInstances = bulmaCollapsible.attach(".is-collapsible");

  return (
    <>
      <ContentSection
        color="primary"
        size="large"
        title="Powered by Hedera"
        subtitle="Vocalcoin is a currency with rapid transaction times, distributed governance, and an open source model"
      />

      <br />

      <div className="container">
        {ITEMS.map((item, i) => {
          return (
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">{item.question}</p>
                <a
                  href="#collapsible-card"
                  data-action="collapse"
                  class="card-header-icon is-hidden-fullscreen"
                  aria-label="more options"
                >
                  <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </a>
              </header>
              <div id="collapsible-card" class="is-collapsible is-active">
                <div class="card-content">
                  <p class="subtitle is-5">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <br />
    </>
  );
}

export default AboutPage;
