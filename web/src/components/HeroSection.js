import React from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import SectionButton from "./SectionButton";
import "./HeroSection.scss";

function HeroSection(props) {
  return (
    <div className="hero-image">
      <div className="container">
        <div className="columns is-vcentered is-desktop ">
          <div className="column is-12-desktop has-text-centered-touch hero-height">
            <SectionHeader
              title={props.title}
              subtitle={props.subtitle}
              size={1}
            />
            <div className="is-centered full-width">
              <SectionButton
                parentColor={props.color}
                size="medium"
                centered
                onClick={props.buttonOnClick}
              >
                {props.buttonText}
              </SectionButton>
            </div>
          </div>
          <div className="column is-1" />
          <div className="column">
            {props.image && (
              <figure className="HeroSection__image image">
                <img src={props.image} alt="Illustration" />
              </figure>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
