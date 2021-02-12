import React from "react";
import HeroSection from "./../components/HeroSection";
import FeaturesSection from "./../components/FeaturesSection";
import { useRouter } from "./../util/router.js";

import logo from "../assets/banner_10.png";
import sideLogo from "../assets/vocal_trans_white.png";
import { useAuth } from "../util/auth";

const HEADER_SUBTITLE = `A distributed political currency. Turning votes and engagement in civil issues into a tradeable digital asset.`;
const FEATURE_DETAIL = `Vocal is a currency and economy for promoting social change and civic engagement. Turning voting and political involvement into a tradeable digital asset. You give a vote, in return you can use those votes to promote your own causes on the Vocalcoin network.`;

function IndexPage(props) {
  const router = useRouter();
  const { user } = useAuth();

  if (user) {
    router.push("/dashboard");
  }

  return (
    <>
      <HeroSection
        color="white"
        size="medium"
        title="Vocalcoin"
        subtitle={HEADER_SUBTITLE}
        buttonText="Get Started"
        image={null}
        background={logo}
        buttonOnClick={() => {
          router.push("/signin");
        }}
      />
      <FeaturesSection
        color="white"
        size="medium"
        title="Features"
        subtitle={FEATURE_DETAIL}
      />
    </>
  );
}

export default IndexPage;
