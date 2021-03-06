import React from "react";
import SignInSection from "./../components/SignInSection";

function SigninPage(props) {
  return (
    <SignInSection
      color="white"
      size="large"
      title="Welcome to Vocal"
      subtitle="Enter your Hedera account details to gain access to Vocal services."
      buttonText="Sign in"
    />
  );
}

export default SigninPage;
