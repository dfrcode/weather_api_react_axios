import React from "react";

import "./Description.css";

const Description = (props) => {
  const { description } = props.weather;

  return <p className="weather-description">{description}</p>;
};

export default Description;
