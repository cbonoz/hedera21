import React from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Features from "./Features";

function FeaturesSection(props) {
  return (
    <Section color={props.color} size={props.size}>
      <div className="container">
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          centered={true}
          size={3}
        />
        <Features
          items={[
            {
              title: "1. Register",
              description:
                "Create a Vocal account to search and participate in global petitions and issues",
              image: "https://uploads.divjoy.com/undraw-mind_map_cwng.svg",
            },
            {
              title: "2. Discover",
              description:
                "Explore existing issues by logging in and navigating to issues you care about.",
              image:
                "https://uploads.divjoy.com/undraw-personal_settings_kihd.svg",
            },
            {
              title: "3. Earn",
              description: "Earn Vocal by voting on issues that matter to you.",
              image: "https://uploads.divjoy.com/undraw-having_fun_iais.svg",
            },
            {
              title: "4. Redeem",
              description:
                "Redeem and exchange vocal for other currencies, or spend Vocal to promote your own initiatives",
              image: "https://uploads.divjoy.com/undraw-balloons_vxx5.svg",
            },
          ]}
        />
      </div>
    </Section>
  );
}

export default FeaturesSection;
