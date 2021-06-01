import React from "react";

import './Temperature.css';

const Temperature = (props) => {
  const { celsius, fahrenheit } = props;
  const { temp } = props.main;

  return (
    <p className="degrees">
      {celsius && !fahrenheit
        ? Math.floor(temp - 273.15)
        : Math.floor(((temp - 273.15) * 9) / 5 + 32)}
      &deg;
    </p>
  );
};

export default Temperature;
