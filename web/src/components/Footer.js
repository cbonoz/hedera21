import React from "react";
import Section from "./Section";
import { Link } from "./../util/router.js";
import "./Footer.scss";

function Footer(props) {
  return (
    <Section color={props.color} size={props.size}>
      <div className="FooterComponent__container container">
        <div className="brand left">
          <Link to="/">
            <img src={props.logo} alt="Logo" />
          </Link>
        </div>
        <div className="links right">
          <Link to="/about">About</Link>
          <a href="mailto:blackshoalgroup@gmail.com">Contact</a>
          <a
            target="_blank"
            href="https://medium.com"
            rel="noopener noreferrer"
          >
            {/* Blog */}
          </a>
        </div>
        <div className="social right"></div>
        <div className="copyright left">{props.copyright}</div>
      </div>
    </Section>
  );
}

export default Footer;
