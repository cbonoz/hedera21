import React from "react";
import Navbar from "./../components/Navbar";
import IndexPage from "./index";
import AboutPage from "./about";
import ContactPage from "./contact";
import DashboardPage from "./dashboard";
import SigninPage from "./signin";
import SignupPage from "./signup";
import ForgotpassPage from "./forgotpass";
import ChangepassPage from "./changepass";
import { Switch, Route, Router } from "./../util/router.js";
import Footer from "./../components/Footer";
import "./../util/analytics.js";
import { ProvideAuth } from "./../util/auth.js";

import logo from "../assets/vocal_trans_black.png";

function App(props) {
  return (
    <ProvideAuth>
      <Router>
        <>
          <Navbar color="white" spaced={true} logo={logo} />

          <Switch>
            <Route exact path="/" component={IndexPage} />

            <Route exact path="/about" component={AboutPage} />

            <Route exact path="/contact" component={ContactPage} />

            <Route exact path="/dashboard" component={DashboardPage} />

            <Route exact path="/signin" component={SigninPage} />

            <Route exact path="/signup" component={SignupPage} />

            <Route exact path="/forgotpass" component={ForgotpassPage} />

            <Route exact path="/changepass" component={ChangepassPage} />

            <Route
              component={({ location }) => {
                return (
                  <div
                    style={{
                      padding: "50px",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    The page <code>{location.pathname}</code> could not be
                    found.
                  </div>
                );
              }}
            />
          </Switch>

          <Footer
            color="light"
            size="normal"
            logo={logo}
            copyright="©2021 Vocalcoin (Testnet)"
          />
        </>
      </Router>
    </ProvideAuth>
  );
}

export default App;
