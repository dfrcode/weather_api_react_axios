import React from "react";

const Description = (props) => {
  const { description } = props.weather;

  return (
    <p className="weather-description">{description}</p>
  );
};

export default Description;
