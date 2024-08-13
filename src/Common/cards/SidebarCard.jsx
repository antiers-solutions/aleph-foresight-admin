import React from "react";
import "./SidebarCard.scss";
import { toPrecise } from "../../helpers/commonHelpers";
import PropTypes from "prop-types";

function SidebarCard({ imageSrc, heading, paragraph, comp }) {
  const isComingSoon = [
    "Amount Staked",
    "Number of Stakers",
    "Disputes Raised",
  ].includes(paragraph);

  const title = isComingSoon ? "Coming Soon" : null;
  const formattedHeading =
    comp === "dashboard" ? toPrecise(heading, 2) : heading;

  return (
    <div className="sidebarCard" title={title}>
      {imageSrc}
      <p className="sidebarCard__text">{paragraph}</p>
      <h2 className="sidebarCard__heading">{formattedHeading}</h2>
    </div>
  );
}

SidebarCard.propTypes = {
  imageSrc: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  comp: PropTypes.string.isRequired,
};

export default SidebarCard;
